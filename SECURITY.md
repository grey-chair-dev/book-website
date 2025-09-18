# Security Checklist

## ✅ Secrets Protection
- [x] .env files are in .gitignore
- [x] No secrets in git history
- [x] No hardcoded database URLs
- [x] No API keys in code
- [x] Environment variables used for sensitive data

## 🔒 Environment Variables
All sensitive data is stored in .env file:
- DATABASE_URL (Neon PostgreSQL)
- PGPASSWORD
- API keys and tokens

## 🚫 Never Commit
- .env files
- .env.local files
- Any files containing passwords, keys, or tokens
- Database connection strings
- API secrets

## ✅ Safe to Commit
- .env.example (with placeholder values)
- Source code
- Configuration files (without secrets)
- Documentation

## 🔍 Pre-commit Checklist
Before every commit, verify:
1. No .env files are staged
2. No hardcoded secrets in new code
3. All sensitive data uses environment variables
4. .env.example is updated if new variables are added
