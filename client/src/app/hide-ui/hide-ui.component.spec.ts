import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideUiComponent } from './hide-ui.component';

describe('HideUiComponent', () => {
  let component: HideUiComponent;
  let fixture: ComponentFixture<HideUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HideUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HideUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
