# API Credits & Free Tier Guide

## 💰 Do You Need Credits?

**Short answer:** Yes, but both services offer **free tiers** that should be enough to get started!

## 🔑 API Services Used

This platform uses **two AI services**:
1. **OpenAI** (GPT-4)
2. **Google Gemini** (gemini-1.5-flash)

## 🆓 Free Tiers Available

### OpenAI Free Tier
- **Free credits:** $5 free credit when you sign up
- **After free credits:** Pay-as-you-go pricing
- **Get started:** https://platform.openai.com/signup
- **Check credits:** https://platform.openai.com/account/billing

### Google Gemini Free Tier
- **Free tier:** Generous free tier with daily limits
- **No credit card required** for free tier
- **Get started:** https://makersuite.google.com/app/apikey
- **Limits:** Check Google AI Studio for current limits

## ⚙️ How the Platform Works

The platform has **automatic fallback**:
1. Tries one AI provider (randomly selected)
2. If it fails, **automatically tries the other**
3. If both fail, shows an error

### You Can Use Just One Service!

**Option 1: Use Only OpenAI**
- Set `OPENAI_API_KEY` in `.env`
- Leave `GEMINI_API_KEY` empty or remove it
- The system will use OpenAI only

**Option 2: Use Only Gemini**
- Set `GEMINI_API_KEY` in `.env`
- Leave `OPENAI_API_KEY` empty or remove it
- The system will use Gemini only

**Option 3: Use Both (Recommended)**
- Set both API keys
- Get automatic fallback if one fails
- Better reliability

## 💡 Cost Estimates

### OpenAI Pricing (as of 2024)
- **GPT-4:** ~$0.03 per 1K input tokens, ~$0.06 per 1K output tokens
- **GPT-3.5-turbo:** Much cheaper (~$0.0015 per 1K tokens)
- **Free $5 credit:** ~166K tokens (enough for testing)

### Gemini Pricing
- **Free tier:** Very generous limits
- **Paid tier:** Check Google AI pricing

## 🎯 Recommendations

### For Testing/Development:
1. **Start with Gemini** (free tier, no credit card needed)
2. **Add OpenAI** if you want better responses ($5 free credit)

### For Production:
1. **Use both** for reliability
2. **Monitor usage** in both dashboards
3. **Set usage limits** to avoid unexpected charges

## 🔧 Current Setup

Your `.env` file should have:
```env
OPENAI_API_KEY=sk-proj-...
GEMINI_API_KEY=AIzaSy...
```

Both keys are already configured! ✅

## 📊 Check Your Credits

### OpenAI:
1. Go to: https://platform.openai.com/account/billing
2. Check "Usage" tab
3. See remaining credits

### Gemini:
1. Go to: https://makersuite.google.com/app/apikey
2. Check your API key status
3. View usage limits

## ⚠️ Important Notes

1. **Free tiers have limits** - Check current limits on each service
2. **Monitor usage** - Set up billing alerts if using paid tiers
3. **API keys are in `.env`** - Never commit this file to git (already in `.gitignore`)
4. **Fallback works** - If one service runs out, the other will be used automatically

## 🚀 Getting Started Without Credits

**Minimum setup:**
1. Get **Gemini API key** (free, no credit card)
2. Add to `.env`: `GEMINI_API_KEY=your_key`
3. Platform will work with Gemini only

**Better setup:**
1. Get **OpenAI API key** ($5 free credit)
2. Get **Gemini API key** (free tier)
3. Add both to `.env`
4. Get automatic fallback and better responses

## ✅ Your Current Status

Based on your setup:
- ✅ OpenAI API key: Configured
- ✅ Gemini API key: Configured
- ✅ Both services ready to use

**You're all set!** The platform will use whichever service has credits available.

## 💰 Cost Management Tips

1. **Start with free tiers** - Test everything first
2. **Monitor usage** - Check dashboards regularly
3. **Set limits** - Configure spending limits in OpenAI dashboard
4. **Use fallback** - Let the system choose the cheapest available option
5. **Optimize prompts** - Shorter prompts = lower costs

## 🆘 If You Run Out of Credits

The platform will:
1. Try the first service → fails
2. Automatically try the second service → works
3. Continue functioning seamlessly

**You'll only see errors if BOTH services are out of credits.**

---

## Summary

- ✅ **Free tiers available** for both services
- ✅ **You can use just one** if preferred
- ✅ **Automatic fallback** if one fails
- ✅ **Your keys are already configured**
- ✅ **Start testing** - free tiers should be enough!

**No immediate payment needed** - free tiers are sufficient for development and testing! 🎉

