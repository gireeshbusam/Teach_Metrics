package com.adtFinalProject.teachMetrics.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidationUtil {
	public static boolean isValidInput(String input) {
        Pattern pattern = Pattern.compile("[{}\"\\\\%&'()*+,-./:;<=>?\\[|\\t\\n]+");
        
        //Checking if there are more than one consecutive special character
        Matcher matcher = pattern.matcher(input);
        while (matcher.find()) {
            if (matcher.group().length() > 1) {
                return false;
            }
        }
        
        return true;
    }
}
