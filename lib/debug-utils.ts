/**
 * Utility functions for debugging
 */

/**
 * Validates certification data to ensure it has all required fields
 * @param certifications Array of certification objects
 * @returns Object with validation results
 */
export function validateCertifications(certifications: any[] = []) {
  if (!Array.isArray(certifications)) {
    return {
      valid: false,
      message: "Certifications is not an array",
      certifications: [],
    }
  }

  if (certifications.length === 0) {
    return {
      valid: true,
      message: "No certifications to validate",
      certifications: [],
    }
  }

  const validatedCerts = certifications.map((cert, index) => {
    const issues = []

    if (!cert.id) issues.push("Missing ID")
    if (!cert.name) issues.push("Missing name")
    if (!cert.issuer) issues.push("Missing issuer")
    if (!cert.date) issues.push("Missing date")
    if (!cert.category) issues.push("Missing category")

    // Check if at least one image type exists
    if (!cert.image && !cert.badgeImage) {
      issues.push("Missing both image and badgeImage")
    }

    // Check if images are valid URLs or paths
    if (cert.image && typeof cert.image === "string" && cert.image.trim() === "") {
      issues.push("Image URL is empty")
    }

    if (cert.badgeImage && typeof cert.badgeImage === "string" && cert.badgeImage.trim() === "") {
      issues.push("Badge image URL is empty")
    }

    return {
      ...cert,
      valid: issues.length === 0,
      issues,
      index,
    }
  })

  const invalidCerts = validatedCerts.filter((cert) => !cert.valid)

  return {
    valid: invalidCerts.length === 0,
    message:
      invalidCerts.length > 0 ? `Found ${invalidCerts.length} invalid certifications` : "All certifications are valid",
    certifications: validatedCerts,
    invalidCertifications: invalidCerts,
  }
}

/**
 * Fixes common issues with certification data
 * @param certifications Array of certification objects
 * @returns Fixed certification array
 */
export function fixCertifications(certifications: any[] = []) {
  if (!Array.isArray(certifications)) {
    return []
  }

  return certifications.map((cert, index) => {
    // Create a new object with default values for missing fields
    return {
      id: cert.id || `cert-${index}`,
      name: cert.name || "Unnamed Certificate",
      issuer: cert.issuer || "Unknown Issuer",
      date: cert.date || "No Date",
      category: cert.category || "Uncategorized",
      image: cert.image && typeof cert.image === "string" && cert.image.trim() !== "" ? cert.image : null,
      badgeImage:
        cert.badgeImage && typeof cert.badgeImage === "string" && cert.badgeImage.trim() !== ""
          ? cert.badgeImage
          : null,
      link: cert.link || null,
    }
  })
}
