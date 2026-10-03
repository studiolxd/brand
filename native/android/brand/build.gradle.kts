plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.paparazzi)
    `maven-publish`
}

// La versión de la publicación viene del tag que construye JitPack (`vX.Y.Z`, variable VERSION); en local, `0.0.0-local`
// para `publishToMavenLocal`.
group = "com.github.studiolxd"
version = System.getenv("VERSION") ?: "0.0.0-local"

android {
    namespace = "com.studiolxd.brand"
    compileSdk = 37
    compileSdkMinor = 2

    defaultConfig {
        minSdk = 26
    }

    buildFeatures {
        compose = true
    }

    lint {
        abortOnError = true
        warningsAsErrors = true
        // «Hay una versión más nueva» no es un defecto del código: sin esto, el build se rompería solo el día que salga una.
        disable += setOf("AndroidGradlePluginVersion", "GradleDependency", "NewerVersionAvailable")
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }
}

dependencies {
    implementation(platform(libs.compose.bom))
    api(libs.compose.foundation)
    api(libs.compose.ui)
    api(libs.compose.ui.graphics)
    api(libs.compose.ui.text)
    api(libs.compose.ui.unit)
    api(libs.compose.animation.core)
    implementation(libs.androidx.core.ktx)

    testImplementation(libs.junit)
    testImplementation(libs.kotlin.test)
    testImplementation(libs.json)
    testImplementation(platform(libs.compose.bom))
    testImplementation(libs.compose.ui.tooling.preview)
}

// `./gradlew build` también compara las capturas con las grabadas (`./gradlew :brand:recordPaparazziDebug` las regraba).
tasks.named("check") { dependsOn("verifyPaparazziDebug") }

publishing {
    publications {
        register<MavenPublication>("release") {
            groupId = "com.github.studiolxd"
            artifactId = "brand"
            version = project.version.toString()
            afterEvaluate { from(components["release"]) }
        }
    }
}
