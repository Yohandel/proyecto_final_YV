import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeBllsComponent } from './income-blls.component';

describe('IncomeBllsComponent', () => {
  let component: IncomeBllsComponent;
  let fixture: ComponentFixture<IncomeBllsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeBllsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeBllsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
