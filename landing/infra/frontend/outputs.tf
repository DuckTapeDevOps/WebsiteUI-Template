# output "cloudfront_domain" {
#   description = "The CloudFront distribution domain name"
#   value       = aws_cloudfront_distribution.website.domain_name
# }

# output "s3_bucket" {
#   description = "The S3 bucket name"
#   value       = aws_s3_bucket.website.bucket
# }

# output "acm_certificate_arn" {
#   description = "The ARN of the ACM certificate"
#   value       = data.aws_acm_certificate.website.arn
# }

# output "cloudfront_distribution_id" {
#   description = "The ID of the CloudFront distribution"
#   value       = aws_cloudfront_distribution.website.id
# }

# output "s3_bucket_arn" {
#   description = "The ARN of the S3 bucket"
#   value       = aws_s3_bucket.website.arn
# }

# output "cognito_user_pool_id" {
#   description = "The ID of the Cognito User Pool"
#   value       = aws_cognito_user_pool.naval_nomad.id
# }

# output "cognito_client_id" {
#   description = "The ID of the Cognito User Pool Client"
#   value       = aws_cognito_user_pool_client.naval_nomad.id
# }

# output "cognito_identity_pool_id" {
#   description = "The ID of the Cognito Identity Pool"
#   value       = aws_cognito_identity_pool.naval_nomad.id
# }

# output "cognito_domain" {
#   description = "The domain of the Cognito User Pool"
#   value       = aws_cognito_user_pool.naval_nomad.endpoint
# } 