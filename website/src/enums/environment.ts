/*! *****************************************************************************
 * Enum representing different application environments.
 * Useful for configuration, logging, and conditional behavior.
 ***************************************************************************** */

/**
 * Represents the possible runtime environments of an application.
 */
enum ENVIRONMENT {
  /**
   * Production environment. Used for live, public-facing deployments.
   */
  PRODUCTION = "production",

  /**
   * Development environment. Used for local development and debugging.
   */
  DEVELOPMENT = "development",

  /**
   * Test environment. Used for automated tests or staging environments.
   */
  TEST = "test",
}

export { ENVIRONMENT };
