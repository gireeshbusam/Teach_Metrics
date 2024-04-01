import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruithomeComponent } from './recruithome.component';

describe('RecruithomeComponent', () => {
  let component: RecruithomeComponent;
  let fixture: ComponentFixture<RecruithomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruithomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruithomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
