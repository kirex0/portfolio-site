import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvResumePage } from './cv-resume-page';

describe('CvResumePage', () => {
  let component: CvResumePage;
  let fixture: ComponentFixture<CvResumePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvResumePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvResumePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
