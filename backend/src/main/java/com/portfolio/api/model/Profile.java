package com.portfolio.api.model;

import java.util.List;

public record Profile(
        String name,
        String role,
        String location,
        String summary,
        List<String> highlights,
        List<String> socialLinks
) {
}
