package com.example.testmodlue4.controller;

import com.example.testmodlue4.model.City;
import com.example.testmodlue4.service.city.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/city")
public class CityController {
    @Autowired
    ICityService cityService;


    @GetMapping()
    public ResponseEntity<List<City>> showAllCity() {
        return new ResponseEntity<>((List<City>) cityService.findAll(), HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<City> createCity(@RequestBody City city){
        return new ResponseEntity<>(cityService.save(city), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Long id){
        Optional<City> city = cityService.findById(id);
        if(!city.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cityService.remove(id);
        return new ResponseEntity<>(city.get(), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> editCity(@PathVariable Long id, @RequestBody City city){
        Optional<City>citys = cityService.findById(id);
        if(!citys.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        city.setId(citys.get().getId());
        return new ResponseEntity<>(cityService.save(city), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCity(@PathVariable Long id) {
        Optional<City> cityOptional = cityService.findById(id);
        return cityOptional.map(city
                -> new ResponseEntity<>(city, HttpStatus.OK)).orElseGet(()
                -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
