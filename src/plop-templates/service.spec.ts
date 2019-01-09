import { TestBed } from '@angular/core/testing';

import { {{pascalCase name}}Service; } from; './{{dashCase name}}.service';

describe('{{pascalCase name}}Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: {{pascalCase name}}Service = TestBed.get({{pascalCase name}}Service);
    expect(service).toBeTruthy();
  })
})
