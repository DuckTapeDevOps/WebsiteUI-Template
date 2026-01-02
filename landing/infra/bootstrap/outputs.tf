# Get current AWS account ID
data "aws_caller_identity" "current" {}

output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "ARN of the IAM role that GitHub Actions can assume for deployments"
} 
