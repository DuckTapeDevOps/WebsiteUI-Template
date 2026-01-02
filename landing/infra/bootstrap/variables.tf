variable "github_repo" {
  description = "GitHub repository in the format 'owner/repo'"
  type        = string
  default     = "krypton/NavalNomadUI"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket for the frontend"
  type        = string
  default     = "naval-nomad-frontend"
}

variable "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  type        = string
}

variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-east-1"
} 

variable "domain_name" {
  description = "The domain name for the website"
  type        = string
  default     = "navalnomad.com"
}