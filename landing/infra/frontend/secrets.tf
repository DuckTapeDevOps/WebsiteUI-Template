resource "aws_secretsmanager_secret" "google_oauth" {
  name = "${var.resource_name_prefix}/google-oauth"
  description = "Google OAuth credentials for ${var.domain_name}"
}

# Note: The actual secret value should be created manually in AWS Console or via AWS CLI
# This is because we don't want to store the actual secret in our Terraform code
# You can create it using:
# aws secretsmanager create-secret \
#   --name ${var.resource_name_prefix}/google-oauth \
#   --secret-string '{"client_id":"your-client-id","client_secret":"your-client-secret"}'

data "aws_secretsmanager_secret" "google_oauth" {
  name = aws_secretsmanager_secret.google_oauth.name
}

data "aws_secretsmanager_secret_version" "google_oauth" {
  secret_id = data.aws_secretsmanager_secret.google_oauth.id
}

locals {
  google_oauth = jsondecode(data.aws_secretsmanager_secret_version.google_oauth.secret_string)
} 