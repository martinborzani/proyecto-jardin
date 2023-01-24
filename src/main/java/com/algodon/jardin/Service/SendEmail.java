package com.algodon.jardin.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SendEmail {

    @Autowired
    JavaMailSender email;


    @PostMapping("sendEmail")
    public ResponseEntity<?> sendEmail (
            @RequestParam String emailUser,
            @RequestParam String name,
            @RequestParam String lastname,
            @RequestParam String number
    ){

        SimpleMailMessage mail = new SimpleMailMessage();


        mail.setTo("burbujasdealgodon12@gmail.com");
        mail.setFrom(emailUser);
        mail.setSubject("consulta");
        mail.setText("El cliente " + name +" " +lastname + " quiere hacer una consulta. - numero de telefono " + number + " email: " + emailUser);

        email.send(mail);


        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
