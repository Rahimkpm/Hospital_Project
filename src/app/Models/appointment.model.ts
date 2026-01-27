export interface Appointment {
  apid: number;
  appointmentDate: string;
  reason: string;
  isDone:string;

  patientName: string;
  patientPhoneNumber: string;
  patientAddress: string;
  doctorName: string;
  hospitalName: string;
  doctorNotes:string;
}