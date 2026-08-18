import { describe, it, expect } from 'vitest';
import { classifyChatIntent } from '../src/lib/router/chatIntentClassifier';

describe('classifyChatIntent', () => {
  it('identifies question "what missing in this architecture"', () => {
    const result = classifyChatIntent('what missing in this architecture');
    expect(result.intent).toBe('question');
    expect(result.isQuestion).toBe(true);
  });

  it('identifies question "what is missing in this architecture?"', () => {
    const result = classifyChatIntent('what is missing in this architecture?');
    expect(result.intent).toBe('question');
    expect(result.isQuestion).toBe(true);
  });

  it('identifies question "explain data flow from client to db"', () => {
    const result = classifyChatIntent('explain data flow from client to db');
    expect(result.intent).toBe('question');
    expect(result.isQuestion).toBe(true);
  });

  it('identifies question "why are we using Pub/Sub?"', () => {
    const result = classifyChatIntent('why are we using Pub/Sub?');
    expect(result.intent).toBe('question');
    expect(result.isQuestion).toBe(true);
  });

  it('identifies question "is this secure?"', () => {
    const result = classifyChatIntent('is this secure?');
    expect(result.intent).toBe('question');
    expect(result.isQuestion).toBe(true);
  });

  it('identifies mutation "add Cloud Armor to Ingress"', () => {
    const result = classifyChatIntent('add Cloud Armor to Ingress');
    expect(result.intent).toBe('mutation');
    expect(result.isQuestion).toBe(false);
  });

  it('identifies mutation "replace Cloud SQL with Spanner"', () => {
    const result = classifyChatIntent('replace Cloud SQL with Spanner');
    expect(result.intent).toBe('mutation');
    expect(result.isQuestion).toBe(false);
  });

  it('identifies polite mutation "please add redis cache"', () => {
    const result = classifyChatIntent('please add redis cache');
    expect(result.intent).toBe('mutation');
    expect(result.isQuestion).toBe(false);
  });
});
