# ACE MEMBERSHIP APP - API Documentation

## API Endpoints Overview
Total: **43 REST API Endpoints**

### Authentication Endpoints (5)
1. `POST /auth/login` - User authentication
2. `POST /auth/logout` - User logout
3. `POST /auth/refresh` - Token refresh
4. `POST /auth/register` - New user registration
5. `GET /auth/profile` - Get user profile

### Member Management (12)
6. `GET /members` - Get all members
7. `GET /members/{id}` - Get specific member
8. `POST /members` - Create new member
9. `PUT /members/{id}` - Update member info
10. `DELETE /members/{id}` - Delete member
11. `GET /members/{id}/history` - Member activity history
12. `PUT /members/{id}/status` - Update membership status
13. `GET /members/search` - Search members
14. `GET /members/statistics` - Member statistics
15. `POST /members/{id}/photo` - Upload member photo
16. `GET /members/expiring` - Get expiring memberships
17. `POST /members/bulk-import` - Bulk member import

### Membership Tiers (6)
18. `GET /tiers` - Get all membership tiers
19. `GET /tiers/{id}` - Get specific tier
20. `POST /tiers` - Create new tier
21. `PUT /tiers/{id}` - Update tier
22. `DELETE /tiers/{id}` - Delete tier
23. `GET /tiers/{id}/benefits` - Get tier benefits

### Promotions & Offers (8)
24. `GET /promotions` - Get all promotions
25. `GET /promotions/active` - Get active promotions
26. `POST /promotions` - Create new promotion
27. `PUT /promotions/{id}` - Update promotion
28. `DELETE /promotions/{id}` - Delete promotion
29. `GET /promotions/{id}/usage` - Get promotion usage stats
30. `POST /promotions/{id}/apply` - Apply promotion to member
31. `GET /members/{id}/promotions` - Get member's applied promotions

### Payment & Transactions (6)
32. `GET /transactions` - Get all transactions
33. `GET /transactions/{id}` - Get specific transaction
34. `POST /transactions` - Create new transaction
35. `GET /members/{id}/transactions` - Get member transactions
36. `POST /payments/process` - Process payment
37. `GET /payments/methods` - Get available payment methods

### Notifications (3)
38. `GET /notifications` - Get all notifications
39. `POST /notifications/send` - Send notification
40. `PUT /notifications/{id}/read` - Mark as read

### System & Reports (3)
41. `GET /system/health` - System health check
42. `GET /reports/dashboard` - Dashboard statistics
43. `GET /reports/export` - Export data reports

## Request/Response Format

### Standard Response Structure
```json
{
  "success": boolean,
  "message": string,
  "data": object|array,
  "timestamp": string,
  "version": string
}
```

### Error Response Structure
```json
{
  "success": false,
  "error": {
    "code": string,
    "message": string,
    "details": object
  },
  "timestamp": string
}
```

## Authentication
- **Type**: Bearer Token
- **Header**: `Authorization: Bearer <token>`
- **Token Expiry**: 24 hours
- **Refresh Mechanism**: Automatic refresh on app startup

## Rate Limiting
- **Limit**: 1000 requests per hour per user
- **Reset**: Hourly reset
- **Headers**: Rate limit info in response headers

## Error Codes
- `AUTH001`: Invalid credentials
- `AUTH002`: Token expired
- `MEMBER001`: Member not found
- `TIER001`: Invalid membership tier
- `PROMO001`: Promotion not valid
- `PAY001`: Payment processing failed

---
*API Version: 1.0*
*Last Updated: 2024*
*Base URL: https://api.acemembership.com/v1*
