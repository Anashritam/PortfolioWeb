package com.portfolio.api.service;

import com.portfolio.api.dto.AuthResponse;
import com.portfolio.api.dto.LoginRequest;
import com.portfolio.api.entity.AdminUserEntity;
import com.portfolio.api.repository.AdminUserRepository;
import com.portfolio.api.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final AdminUserRepository adminUserRepository;
    private final JwtService jwtService;

    public AuthService(
            AuthenticationManager authenticationManager,
            AdminUserRepository adminUserRepository,
            JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.adminUserRepository = adminUserRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse login(LoginRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        AdminUserEntity admin = adminUserRepository.findByEmail(request.email()).orElseThrow();
        return new AuthResponse(jwtService.createToken(principal), admin.getEmail(), admin.getDisplayName());
    }
}
