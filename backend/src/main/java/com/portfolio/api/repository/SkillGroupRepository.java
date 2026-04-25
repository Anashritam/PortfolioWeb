package com.portfolio.api.repository;

import com.portfolio.api.entity.SkillGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillGroupRepository extends JpaRepository<SkillGroupEntity, Long> {
    List<SkillGroupEntity> findAllByOrderBySortOrderAscIdAsc();
}
