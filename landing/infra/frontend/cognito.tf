# User pool client
resource "aws_cognito_user_pool_client" "naval_nomad" {
  name = "naval-nomad-web-client"

  user_pool_id = data.terraform_remote_state.bootstrap.outputs.user_pool_id

  generate_secret = false

  # OAuth settings
  callback_urls = [
    "https://${var.domain_name}/auth/callback",
    "http://localhost:5173/auth/callback"
  ]
  logout_urls = [
    "https://${var.domain_name}",
    "http://localhost:5173"
  ]

  allowed_oauth_flows = ["code"]
  allowed_oauth_scopes = ["email", "openid", "profile"]
  allowed_oauth_flows_user_pool_client = true

  # Token validity
  refresh_token_validity = 30
  access_token_validity  = 1
  id_token_validity     = 1

  token_validity_units {
    refresh_token = "days"
    access_token  = "hours"
    id_token     = "hours"
  }

  # Prevent user existence errors
  prevent_user_existence_errors = "ENABLED"

  # Enable OAuth flows
  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]

  # Enable token revocation
  enable_token_revocation = true
}

# Update the identity pool with the client configuration
resource "aws_cognito_identity_pool_roles_attachment" "naval_nomad" {
  identity_pool_id = data.terraform_remote_state.bootstrap.outputs.identity_pool_id
  roles = {
    "authenticated" = data.terraform_remote_state.bootstrap.outputs.cognito_auth_role_arn
  }

  role_mapping {
    identity_provider = "cognito-idp.${data.aws_region.current.name}.amazonaws.com/${data.terraform_remote_state.bootstrap.outputs.user_pool_id}:${aws_cognito_user_pool_client.naval_nomad.id}"
    type = "Token"
    ambiguous_role_resolution = "AuthenticatedRole"
  }
}

# Get current region
data "aws_region" "current" {}

# Data source to get bootstrap state
data "terraform_remote_state" "bootstrap" {
  backend = "s3"
  config = {
    bucket = "naval-nomad-terraform-state"
    key    = "bootstrap/terraform.tfstate"
    region = "us-east-1"
  }
}

# IAM role for Cognito
resource "aws_iam_role" "cognito_auth_role" {
  name = "naval-nomad-cognito-auth-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = "cognito-identity.amazonaws.com"
        }
        Condition = {
          StringEquals = {
            "cognito-identity.amazonaws.com:aud" = data.terraform_remote_state.bootstrap.outputs.identity_pool_id
          }
        }
      }
    ]
  })
}

# Attach policies to the role
resource "aws_iam_role_policy_attachment" "cognito_auth_policy" {
  role       = aws_iam_role.cognito_auth_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognito-DeveloperAuthenticatedIdentities"
}
