import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotCharCreatorComponent } from './got-char-creator.component';

describe('GotCharCreatorComponent', () => {
  let component: GotCharCreatorComponent;
  let fixture: ComponentFixture<GotCharCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GotCharCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GotCharCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
