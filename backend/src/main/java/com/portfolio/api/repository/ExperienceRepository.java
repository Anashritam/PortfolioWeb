package com.portfolio.api.repository;

import com.portfolio.api.entity.ExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<ExperienceEntity, Long> {
    List<ExperienceEntity> findAllByOrderBySortOrderAscIdAsc();
}
