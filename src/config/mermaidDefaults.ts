export const DEFAULT_MERMAID_CODE = `graph TD
    A[Start] --> B{User logged in?}
    B -->|Yes| C[Dashboard]
    B -->|No| D[Login Page]
    D --> E[Enter Credentials]
    E --> B`;
