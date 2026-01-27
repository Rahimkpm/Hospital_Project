import { HttpClient } from "@angular/common/http";

export class DoctordashboardComponent {
  patients: any[] = [];
  messages: any[] = [];
  selectedPatientId!: number;
  doctorId = 1;
  newMessage = '';

  constructor(private http: HttpClient) {}

  selectPatient(patient: any) {
    this.selectedPatientId = patient.id;
    this.loadChat();
  }

  loadChat() {
    this.http.get<any[]>(
      `/api/chat/${this.doctorId}/${this.selectedPatientId}`
    ).subscribe(res => this.messages = res);
  }

  send() {
    const msg = {
      doctorId: this.doctorId,
      patientId: this.selectedPatientId,
      message: this.newMessage,
      isFromDoctor: true
    };

    this.http.post('/api/chat/send', msg).subscribe(() => {
      this.newMessage = '';
      this.loadChat();
    });
  }
}
