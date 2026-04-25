package com.portfolio.api.repository;

import com.portfolio.api.entity.BlogPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPostEntity, Long> {
    List<BlogPostEntity> findAllByPublishedTrueOrderByCreatedAtDesc();

    List<BlogPostEntity> findAllByOrderByCreatedAtDesc();

    Optional<BlogPostEntity> findBySlug(String slug);
}
