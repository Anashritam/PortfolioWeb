package com.portfolio.api.service;

import com.portfolio.api.dto.ContactMessageResponse;
import com.portfolio.api.dto.ContactRequest;
import com.portfolio.api.dto.ContactResponse;
import com.portfolio.api.dto.AdminBlogPostResponse;
import com.portfolio.api.dto.AdminExperienceResponse;
import com.portfolio.api.dto.AdminProjectResponse;
import com.portfolio.api.dto.AdminSkillGroupResponse;
import com.portfolio.api.dto.BlogPostRequest;
import com.portfolio.api.dto.ExperienceRequest;
import com.portfolio.api.dto.ProfileRequest;
import com.portfolio.api.dto.ProjectRequest;
import com.portfolio.api.dto.SkillGroupRequest;
import com.portfolio.api.entity.BlogPostEntity;
import com.portfolio.api.entity.ContactMessageEntity;
import com.portfolio.api.entity.ExperienceEntity;
import com.portfolio.api.entity.ProfileEntity;
import com.portfolio.api.entity.ProjectEntity;
import com.portfolio.api.entity.SkillGroupEntity;
import com.portfolio.api.exception.ResourceNotFoundException;
import com.portfolio.api.model.BlogPost;
import com.portfolio.api.model.Experience;
import com.portfolio.api.model.Profile;
import com.portfolio.api.model.Project;
import com.portfolio.api.model.SkillGroup;
import com.portfolio.api.repository.BlogPostRepository;
import com.portfolio.api.repository.ContactMessageRepository;
import com.portfolio.api.repository.ExperienceRepository;
import com.portfolio.api.repository.ProfileRepository;
import com.portfolio.api.repository.ProjectRepository;
import com.portfolio.api.repository.SkillGroupRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioService {
    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillGroupRepository skillGroupRepository;
    private final ExperienceRepository experienceRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final BlogPostRepository blogPostRepository;

    public PortfolioService(
            ProfileRepository profileRepository,
            ProjectRepository projectRepository,
            SkillGroupRepository skillGroupRepository,
            ExperienceRepository experienceRepository,
            ContactMessageRepository contactMessageRepository,
            BlogPostRepository blogPostRepository
    ) {
        this.profileRepository = profileRepository;
        this.projectRepository = projectRepository;
        this.skillGroupRepository = skillGroupRepository;
        this.experienceRepository = experienceRepository;
        this.contactMessageRepository = contactMessageRepository;
        this.blogPostRepository = blogPostRepository;
    }

    // ── Profile ──────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Profile getProfile() {
        return toProfile(profile());
    }

    @Transactional
    public Profile updateProfile(ProfileRequest request) {
        ProfileEntity profile = profile();
        profile.setName(request.name());
        profile.setRole(request.role());
        profile.setLocation(request.location());
        profile.setSummary(request.summary());
        profile.setResumeUrl(request.resumeUrl());
        profile.getHighlights().clear();
        profile.getHighlights().addAll(request.highlights());
        profile.getSocialLinks().clear();
        profile.getSocialLinks().addAll(request.socialLinks());
        return toProfile(profileRepository.save(profile));
    }

    // ── Projects ─────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<Project> getProjects() {
        return projectRepository.findAllByOrderBySortOrderAscIdAsc().stream().map(this::toProject).toList();
    }

    @Transactional(readOnly = true)
    public List<AdminProjectResponse> getAdminProjects() {
        return projectRepository.findAllByOrderBySortOrderAscIdAsc().stream().map(this::toAdminProject).toList();
    }

    @Transactional(readOnly = true)
    public Project getProject(String slug) {
        return projectRepository.findBySlug(slug).map(this::toProject)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + slug));
    }

    @Transactional
    public Project createProject(ProjectRequest request) {
        ProjectEntity project = new ProjectEntity();
        applyProject(project, request);
        project.setCreatedAt(Instant.now());
        project.setUpdatedAt(Instant.now());
        return toProject(projectRepository.save(project));
    }

    @Transactional
    public Project updateProject(Long id, ProjectRequest request) {
        ProjectEntity project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + id));
        applyProject(project, request);
        project.setUpdatedAt(Instant.now());
        return toProject(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found: " + id);
        }
        projectRepository.deleteById(id);
    }

    // ── Skills ───────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<SkillGroup> getSkills() {
        return skillGroupRepository.findAllByOrderBySortOrderAscIdAsc().stream().map(this::toSkillGroup).toList();
    }

    @Transactional(readOnly = true)
    public List<AdminSkillGroupResponse> getAdminSkills() {
        return skillGroupRepository.findAllByOrderBySortOrderAscIdAsc().stream().map(this::toAdminSkillGroup).toList();
    }

    @Transactional
    public SkillGroup createSkillGroup(SkillGroupRequest request) {
        SkillGroupEntity group = new SkillGroupEntity();
        applySkillGroup(group, request);
        return toSkillGroup(skillGroupRepository.save(group));
    }

    @Transactional
    public SkillGroup updateSkillGroup(Long id, SkillGroupRequest request) {
        SkillGroupEntity group = skillGroupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill group not found: " + id));
        applySkillGroup(group, request);
        return toSkillGroup(skillGroupRepository.save(group));
    }

    @Transactional
    public void deleteSkillGroup(Long id) {
        if (!skillGroupRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill group not found: " + id);
        }
        skillGroupRepository.deleteById(id);
    }

    // ── Experience ───────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<Experience> getExperience() {
        return experienceRepository.findAllByOrderBySortOrderAscIdAsc().stream().map(this::toExperience).toList();
    }

    @Transactional(readOnly = true)
    public List<AdminExperienceResponse> getAdminExperience() {
        return experienceRepository.findAllByOrderBySortOrderAscIdAsc().stream().map(this::toAdminExperience).toList();
    }

    @Transactional
    public Experience createExperience(ExperienceRequest request) {
        ExperienceEntity experience = new ExperienceEntity();
        applyExperience(experience, request);
        return toExperience(experienceRepository.save(experience));
    }

    @Transactional
    public Experience updateExperience(Long id, ExperienceRequest request) {
        ExperienceEntity experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found: " + id));
        applyExperience(experience, request);
        return toExperience(experienceRepository.save(experience));
    }

    @Transactional
    public void deleteExperience(Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experience not found: " + id);
        }
        experienceRepository.deleteById(id);
    }

    // ── Blog Posts ───────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<BlogPost> getPublishedBlogPosts() {
        return blogPostRepository.findAllByPublishedTrueOrderByCreatedAtDesc().stream().map(this::toBlogPost).toList();
    }

    @Transactional(readOnly = true)
    public BlogPost getBlogPost(String slug) {
        return blogPostRepository.findBySlug(slug).map(this::toBlogPost)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found: " + slug));
    }

    @Transactional(readOnly = true)
    public List<AdminBlogPostResponse> getAdminBlogPosts() {
        return blogPostRepository.findAllByOrderByCreatedAtDesc().stream().map(this::toAdminBlogPost).toList();
    }

    @Transactional
    public BlogPost createBlogPost(BlogPostRequest request) {
        BlogPostEntity post = new BlogPostEntity();
        applyBlogPost(post, request);
        post.setCreatedAt(Instant.now());
        post.setUpdatedAt(Instant.now());
        return toBlogPost(blogPostRepository.save(post));
    }

    @Transactional
    public BlogPost updateBlogPost(Long id, BlogPostRequest request) {
        BlogPostEntity post = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found: " + id));
        applyBlogPost(post, request);
        post.setUpdatedAt(Instant.now());
        return toBlogPost(blogPostRepository.save(post));
    }

    @Transactional
    public void deleteBlogPost(Long id) {
        if (!blogPostRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog post not found: " + id);
        }
        blogPostRepository.deleteById(id);
    }

    // ── Contact Messages ─────────────────────────────────────────────────

    @Transactional
    public ContactResponse saveContactMessage(ContactRequest request) {
        ContactMessageEntity message = new ContactMessageEntity();
        message.setName(request.name());
        message.setEmail(request.email());
        message.setSubject(request.subject());
        message.setMessage(request.message());
        message.setCreatedAt(Instant.now());
        ContactMessageEntity saved = contactMessageRepository.save(message);
        return new ContactResponse("Thanks " + saved.getName() + ", your message has been received.", saved.getCreatedAt());
    }

    @Transactional(readOnly = true)
    public List<ContactMessageResponse> getMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc().stream().map(this::toContactMessage).toList();
    }

    @Transactional
    public ContactMessageResponse markMessageRead(Long id) {
        ContactMessageEntity message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found: " + id));
        message.setRead(true);
        return toContactMessage(contactMessageRepository.save(message));
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    private ProfileEntity profile() {
        return profileRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio profile has not been seeded."));
    }

    private void applyProject(ProjectEntity project, ProjectRequest request) {
        project.setSlug(request.slug());
        project.setTitle(request.title());
        project.setCategory(request.category());
        project.setDescription(request.description());
        project.setImageUrl(request.image());
        project.setGithubUrl(request.githubUrl());
        project.setLiveUrl(request.liveUrl());
        project.setFeatured(request.featured());
        project.setSortOrder(request.sortOrder());
        project.getTechStack().clear();
        project.getTechStack().addAll(request.techStack());
    }

    private void applySkillGroup(SkillGroupEntity group, SkillGroupRequest request) {
        group.setTitle(request.title());
        group.setSortOrder(request.sortOrder());
        group.getSkills().clear();
        group.getSkills().addAll(request.skills());
    }

    private void applyExperience(ExperienceEntity experience, ExperienceRequest request) {
        experience.setPeriod(request.period());
        experience.setTitle(request.title());
        experience.setOrganization(request.organization());
        experience.setDescription(request.description());
        experience.setSortOrder(request.sortOrder());
    }

    private void applyBlogPost(BlogPostEntity post, BlogPostRequest request) {
        post.setSlug(request.slug());
        post.setTitle(request.title());
        post.setExcerpt(request.excerpt());
        post.setContent(request.content());
        post.setCoverImage(request.coverImage());
        post.setPublished(request.published());
        post.getTags().clear();
        if (request.tags() != null) {
            post.getTags().addAll(request.tags());
        }
    }

    private Profile toProfile(ProfileEntity profile) {
        return new Profile(profile.getName(), profile.getRole(), profile.getLocation(), profile.getSummary(),
                profile.getHighlights(), profile.getSocialLinks());
    }

    private Project toProject(ProjectEntity project) {
        return new Project(project.getSlug(), project.getTitle(), project.getCategory(), project.getDescription(),
                project.getTechStack(), project.getImageUrl(), project.getGithubUrl(), project.getLiveUrl(),
                project.isFeatured());
    }

    private AdminProjectResponse toAdminProject(ProjectEntity project) {
        return new AdminProjectResponse(project.getId(), project.getSlug(), project.getTitle(), project.getCategory(),
                project.getDescription(), project.getTechStack(), project.getImageUrl(), project.getGithubUrl(),
                project.getLiveUrl(), project.isFeatured(), project.getSortOrder());
    }

    private SkillGroup toSkillGroup(SkillGroupEntity group) {
        return new SkillGroup(group.getTitle(), group.getSkills());
    }

    private AdminSkillGroupResponse toAdminSkillGroup(SkillGroupEntity group) {
        return new AdminSkillGroupResponse(group.getId(), group.getTitle(), group.getSkills(), group.getSortOrder());
    }

    private Experience toExperience(ExperienceEntity experience) {
        return new Experience(experience.getPeriod(), experience.getTitle(), experience.getOrganization(),
                experience.getDescription());
    }

    private AdminExperienceResponse toAdminExperience(ExperienceEntity experience) {
        return new AdminExperienceResponse(experience.getId(), experience.getPeriod(), experience.getTitle(),
                experience.getOrganization(), experience.getDescription(), experience.getSortOrder());
    }

    private BlogPost toBlogPost(BlogPostEntity post) {
        return new BlogPost(post.getSlug(), post.getTitle(), post.getExcerpt(), post.getContent(),
                post.getCoverImage(), new ArrayList<>(post.getTags()), post.getCreatedAt());
    }

    private AdminBlogPostResponse toAdminBlogPost(BlogPostEntity post) {
        return new AdminBlogPostResponse(post.getId(), post.getSlug(), post.getTitle(), post.getExcerpt(),
                post.getContent(), post.getCoverImage(), new ArrayList<>(post.getTags()), post.isPublished(),
                post.getCreatedAt(), post.getUpdatedAt());
    }

    private ContactMessageResponse toContactMessage(ContactMessageEntity message) {
        return new ContactMessageResponse(message.getId(), message.getName(), message.getEmail(), message.getSubject(),
                message.getMessage(), message.isRead(), message.getCreatedAt());
    }
}
