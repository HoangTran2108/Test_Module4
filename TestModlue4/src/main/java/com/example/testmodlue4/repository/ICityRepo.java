package com.example.testmodlue4.repository;

import com.example.testmodlue4.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICityRepo extends JpaRepository<City, Long> {
}
