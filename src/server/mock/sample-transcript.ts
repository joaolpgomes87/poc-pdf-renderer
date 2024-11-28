
export const sampleTranscript: any = {
  issued_for: "Some School",
  id: "TR-2024-001",
  email: "john.doe@example.com",
  issued_to: "John Doe",
  endorsements: Array(100).fill(null).map((_, index) => ({
    id: `END-${(index + 1).toString().padStart(3, '0')}`,
    name: `Transcript Endorsement ${index + 1}`,
    issuer: "Some Issuing Authority",
    date: "2024-01-10",
    description: "Advanced medical care certification for maritime personnel"
  }))
}; 