Gradle sync failed: Cause: dl.google.com:443 failed to respond

vim .gradle/gradle.properties

# 由於一下配置導致： Gradle sync failed: Cause: dl.google.com:443 failed to respond
#systemProp.https.proxyPort=1080
#systemProp.http.proxyHost=127.0.0.1
#systemProp.https.proxyHost=127.0.0.1
#systemProp.http.proxyPort=1080




Gradle sync failed: Failed to find Build Tools revision 28.0.2

Android Sdk -> build tool -> corresponding version



Unable to resolve dependency for ':app@debugAndroidTest/compileClasspath': Could not resolve junit:junit:4.12.


repositories {
        google()
        jcenter()
        maven { url 'http://repo1.maven.org/maven2' }
    }


    

