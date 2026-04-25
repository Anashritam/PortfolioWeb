package com.portfolio.api.dto;

import java.time.Instant;

public record ContactMessageResponse(
        Long id,
        String name,
        String email,
        String subject,
        String message,
        boolean read,
        Instant createdAt
) {
}
