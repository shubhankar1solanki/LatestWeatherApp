package com.rnweatherappv63;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class WeatherNotificationModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "WeatherApp";
    private static ReactApplicationContext reactContext;

    public WeatherNotificationModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService(String url, String body) {
        Intent intent = new Intent(this.reactContext, WeatherNotificationService.class);

        intent.putExtra("url", url);
        intent.putExtra("body", body);
        this.reactContext.startService(intent);
    }

    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, WeatherNotificationService.class));
    }
}
