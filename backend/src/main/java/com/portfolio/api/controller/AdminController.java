package com.portfolio.api.controller;

import com.portfolio.api.dto.ContactMessageResponse;
import com.portfolio.api.dto.AdminBlogPostResponse;
import com.portfolio.api.dto.AdminExperienceResponse;
import com.portfolio.api.dto.AdminProjectResponse;
import com.portfolio.api.dto.AdminSkillGroupResponse;
import com.portfolio.api.dto.BlogPostRequest;
import com.portfolio.api.dto.ExperienceRequest;
import com.portfolio.api.dto.ImageUploadResponse;
import com.portfolio.api.dto.ProfileRequest;
import com.portfolio.api.dto.ProjectRequest;
import com.portfolio.api.dto.SkillGroupRequest;
import com.portfolio.api.model.BlogPost;
import com.portfolio.api.model.Experience;
import com.portfolio.api.model.Profile;
import com.portfolio.api.model.Project;
import com.portfolio.api.model.SkillGroup;
import com.portfolio.api.service.PortfolioService;
import com.portfolio.api.service.ImageStorageService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final PortfolioService portfolioService;
    private final ImageStorageService imageStorageService;

    public AdminController(PortfolioService portfolioService, ImageStorageService imageStorageService) {
        this.portfolioService = portfolioService;
        this.imageStorageService = imageStorageService;
    }

    // ── Profile ──────────────────────────────────────────────────────────

    @GetMapping("/profile")
    public Profile profile() {
        return portfolioService.getProfile();
    }

    @PutMapping("/profile")
    public Profile updateProfile(@Valid @RequestBody ProfileRequest request) {
        return portfolioService.updateProfile(request);
    }

    // ── Projects ─────────────────────────────────────────────────────────

    @GetMapping("/projects")
    public List<AdminProjectResponse> projects() {
        return portfolioService.getAdminProjects();
    }

    @PostMapping("/projects")
    public Project createProject(@Valid @RequestBody ProjectRequest request) {
        return portfolioService.createProject(request);
    }

    @PutMapping("/projects/{id}")
    public Project updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequest request) {
        return portfolioService.updateProject(id, request);
    }

    @DeleteMapping("/projects/{id}")
    public void deleteProject(@PathVariable Long id) {
        portfolioService.deleteProject(id);
    }

    // ── Blog Posts ───────────────────────────────────────────────────────

    @GetMapping("/blog")
    public List<AdminBlogPostResponse> blogPosts() {
        return portfolioService.getAdminBlogPosts();
    }

    @PostMapping("/blog")
    public BlogPost createBlogPost(@Valid @RequestBody BlogPostRequest request) {
        return portfolioService.createBlogPost(request);
    }

    @PutMapping("/blog/{id}")
    public BlogPost updateBlogPost(@PathVariable Long id, @Valid @RequestBody BlogPostRequest request) {
        return portfolioService.updateBlogPost(id, request);
    }

    @DeleteMapping("/blog/{id}")
    public void deleteBlogPost(@PathVariable Long id) {
        portfolioService.deleteBlogPost(id);
    }

    // ── Skills ───────────────────────────────────────────────────────────

    @GetMapping("/skills")
    public List<AdminSkillGroupResponse> skills() {
        return portfolioService.getAdminSkills();
    }

    @PostMapping("/skills")
    public SkillGroup createSkillGroup(@Valid @RequestBody SkillGroupRequest request) {
        return portfolioService.createSkillGroup(request);
    }

    @PutMapping("/skills/{id}")
    public SkillGroup updateSkillGroup(@PathVariable Long id, @Valid @RequestBody SkillGroupRequest request) {
        return portfolioService.updateSkillGroup(id, request);
    }

    @DeleteMapping("/skills/{id}")
    public void deleteSkillGroup(@PathVariable Long id) {
        portfolioService.deleteSkillGroup(id);
    }

    // ── Experience ───────────────────────────────────────────────────────

    @GetMapping("/experience")
    public List<AdminExperienceResponse> experience() {
        return portfolioService.getAdminExperience();
    }

    @PostMapping("/experience")
    public Experience createExperience(@Valid @RequestBody ExperienceRequest request) {
        return portfolioService.createExperience(request);
    }

    @PutMapping("/experience/{id}")
    public Experience updateExperience(@PathVariable Long id, @Valid @RequestBody ExperienceRequest request) {
        return portfolioService.updateExperience(id, request);
    }

    @DeleteMapping("/experience/{id}")
    public void deleteExperience(@PathVariable Long id) {
        portfolioService.deleteExperience(id);
    }

    // ── Messages ─────────────────────────────────────────────────────────

    @GetMapping("/messages")
    public List<ContactMessageResponse> messages() {
        return portfolioService.getMessages();
    }

    @PatchMapping("/messages/{id}/read")
    public ContactMessageResponse markMessageRead(@PathVariable Long id) {
        return portfolioService.markMessageRead(id);
    }

    // ── Images ───────────────────────────────────────────────────────────

    @PostMapping(value = "/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ImageUploadResponse uploadImage(@RequestParam MultipartFile file) throws IOException {
        return imageStorageService.store(file);
    }
}
