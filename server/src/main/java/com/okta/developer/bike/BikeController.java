package com.okta.developer.bike;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
class BikeController {
    private BikeRepository repository;

    public BikeController(BikeRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/get-bikes")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Bike> getBikes() {
        return repository.findAll().stream()
                .filter(this::isCool)
                .collect(Collectors.toList());
    }

    private boolean isCool(Bike bike) {
        return !bike.getName().equals("Shine12") &&
                !bike.getName().equals("Triumph Stag") &&
                !bike.getName().equals("Ford Pinto") &&
                !bike.getName().equals("Yugo GV");
    }
}