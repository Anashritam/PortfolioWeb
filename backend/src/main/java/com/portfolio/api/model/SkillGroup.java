package com.portfolio.api.model;

import java.util.List;

public record SkillGroup(
        String title,
        List<String> skills
) {
}
