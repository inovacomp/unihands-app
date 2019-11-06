package com.siacapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.kevinejohn.RNMixpanel.*;  // <--- import
import java.util.List;
import java.util.Arrays;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "siacapp";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
          @Override
          protected ReactRootView createRootView() {
           return new RNGestureHandlerEnabledRootView(MainActivity.this);
          }
        };
    }
    /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    // @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new RNMixpanel(), // <------ add here
        new MainReactPackage());
    }
}
