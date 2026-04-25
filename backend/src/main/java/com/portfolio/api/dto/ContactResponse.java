package com.portfolio.api.dto;

import java.time.Instant;

public record ContactResponse(
        String message,
        Instant receivedAt
) {
}
