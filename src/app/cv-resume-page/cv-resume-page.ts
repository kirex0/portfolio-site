import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cv-resume-page',
  imports: [CommonModule],
  templateUrl: './cv-resume-page.html',
  styleUrl: './cv-resume-page.scss'
})
export class CvResumePage {
  resumePath: SafeResourceUrl;
  cvPath: SafeResourceUrl;

  private resumePathRaw = '/assets/resume_and_cv/resume.pdf';
  private cvPathRaw = '/assets/resume_and_cv/cv.pdf';

  constructor(private sanitizer: DomSanitizer) {
    this.resumePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.resumePathRaw);
    this.cvPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.cvPathRaw);
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = this.resumePathRaw;
    link.download = 'Resume.pdf';
    link.click();
  }

  downloadCv(): void {
    const link = document.createElement('a');
    link.href = this.cvPathRaw;
    link.download = 'CV.pdf';
    link.click();
  }
}
