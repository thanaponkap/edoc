import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedocPage } from './detailedoc.page';

describe('DetailedocPage', () => {
  let component: DetailedocPage;
  let fixture: ComponentFixture<DetailedocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
