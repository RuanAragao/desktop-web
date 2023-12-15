export const ApplicationsGatewayHttp = async () => {
  const BASE_URL = window.location.origin || process.env.BASE_URL
  const response = await fetch(`${BASE_URL}/api/applications`)
  return response.json()
}
