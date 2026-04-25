package com.portfolio.api.controller;

import com.portfolio.api.dto.ContactRequest;
import com.portfolio.api.dto.ContactResponse;
import com.portfolio.api.model.BlogPost;
import com.portfolio.api.model.Experience;
import com.portfolio.api.model.Profile;
import com.portfolio.api.model.Project;
import com.portfolio.api.model.SkillGroup;
import com.portfolio.api.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PortfolioController {
    private final String appName;
    private final PortfolioService portfolioService;

    public PortfolioController(@Value("${spring.application.name}") String appName, PortfolioService portfolioService) {
        this.appName = appName;
        this.portfolioService = portfolioService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "service", appName);
    }

    @GetMapping("/profile")
    public Profile profile() {
        return portfolioService.getProfile();
    }

    @GetMapping("/projects")
    public List<Project> projects() {
        return portfolioService.getProjects();
    }

    @GetMapping("/projects/{slug}")
    public Project project(@PathVariable String slug) {
        return portfolioService.getProject(slug);
    }

    @GetMapping("/skills")
    public List<SkillGroup> skills() {
        return portfolioService.getSkills();
    }

    @GetMapping("/experience")
    public List<Experience> experience() {
        return portfolioService.getExperience();
    }

    @GetMapping("/blog")
    public List<BlogPost> blogPosts() {
        return portfolioService.getPublishedBlogPosts();
    }

    @GetMapping("/blog/{slug}")
    public BlogPost blogPost(@PathVariable String slug) {
        return portfolioService.getBlogPost(slug);
    }

    @PostMapping("/contact")
    public ContactResponse contact(@Valid @RequestBody ContactRequest request) {
        return portfolioService.saveContactMessage(request);
    }
}
