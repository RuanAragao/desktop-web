export default interface ApplicationsGateway {
  getApplications(): Promise<any[]>
}
