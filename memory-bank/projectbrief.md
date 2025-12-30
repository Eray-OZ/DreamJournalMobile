# Project Brief: Dream Journal Mobile

## Project Overview

A mobile application built with **Expo (React Native)** that allows users to record their dreams and receive AI-powered analysis using the **Gemini API**.

## Core Requirements

### Functional Requirements

1. **User Authentication**

   - Email/Password login and registration
   - Google Sign-In
   - Session persistence

2. **Dream Management**

   - Create, read, delete dreams
   - Store title and content
   - AI-generated analysis (Gemini API)
   - Automatic categorization

3. **User Experience**
   - Search dreams by title/content
   - Filter by category
   - Offline support

### Non-Functional Requirements

- Cross-platform (iOS + Android)
- Dark theme UI
- Secure data storage (Firebase)
- Offline-first architecture

## Project Scope

### In Scope

- User authentication
- Dream CRUD operations
- AI dream analysis
- Category filtering
- Search functionality
- Offline persistence

### Out of Scope (from original web app)

- Image generation (Stability AI)
- Story generation
- Public dream feed / social features

## Success Criteria

- Users can sign up, log in, and persist sessions
- Users can add dreams and receive AI analysis
- Dreams are stored securely per user
- App works offline with sync

## Origin

This is a mobile migration of the web-based Dream Journal (Rüya Günlüğü) final exam project, originally built with Node.js + Express + EJS + MongoDB.
