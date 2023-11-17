package com.example.backend.services.token;

import com.example.backend.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@RequiredArgsConstructor
public class TokenServiceImpl implements ITokenService{

    @Value("${application.security.jwt.secret-key}")
    private final String secretKey;

    @Value("${application.security.jwt.expiration}")
    private final long jwtExpiration;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private final long refreshExpiration;

    @Override
    public Long extractUserID(String jwt) {
        return Long.valueOf(extractClaim(jwt, Claims::getSubject));
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    @Override
    public boolean isValidToken(@NonNull String token, @NonNull UserDetails userDetails) {

        User user = (User) userDetails;
        return (extractUserID(token).equals(user.getId()) && !isExpiredToken(token));

    }

    @Override
    public boolean isExpiredToken(@NonNull String token) {
        return extractExpiration(token).before(new Date());
    }

    @Override
    public String generateToken(@NonNull Map<String, Object> extraClaims, @NonNull UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    @Override
    public String generateToken(@NonNull UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, jwtExpiration);
    }

    @Override
    public String generateRefreshToken(@NonNull UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {

        User user = (User) userDetails;

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(String.valueOf(user.getId()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) //private key
                .compact();
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey()) //public key
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
