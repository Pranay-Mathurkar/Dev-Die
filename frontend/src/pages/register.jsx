import { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid, Link } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, googleLogin } = useContext(AuthContext);

  const handleRegisterAuth = async (e) => {
    e.preventDefault();

    setError("");

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await register(name, email, password);
    } catch (err) {
      console.error(err);
      let message = err.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
      
      {/* LEFT SIDE: Branding / Visuals (Blue Block) */}
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          color: 'white',
          position: 'relative'
        }}
      >
        <Box sx={{ maxWidth: 400, zIndex: 2 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, letterSpacing: 2 }}>
            MEDICO
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 300, opacity: 0.9 }}>
            Your health tracking companion.
          </Typography>
          <Box sx={{ height: 4, width: 60, bgcolor: 'white', mb: 4, borderRadius: 2 }} />
          <Typography variant="body1" sx={{ lineHeight: 1.8, opacity: 0.8 }}>
            "Join thousands of users who trust Medico to manage their daily prescriptions and health reminders efficiently."
          </Typography>
        </Box>
        {/* Decorative Circle */}
        <Box sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)'
        }} />
      </Grid>

      {/* RIGHT SIDE: Form (Clean White) */}
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={0} square sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 450,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography component="h1" variant="h4" fontWeight="800" color="text.primary">
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Enter your details to get started with Medico.
            </Typography>
          </Box>

          {/* Google Login Section */}
          <Box sx={{ width: '100%', mb: 3 }}>
             <GoogleLogin
                onSuccess={googleLogin}
                onError={() => setError("Google login failed")}
                theme="outline"
                size="large"
                width="100%"
                text="signup_with"
                shape="rectangular"
              />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ flex: 1, borderBottom: '1px solid #e0e0e0' }} />
            <Typography variant="caption" sx={{ px: 2, color: 'text.disabled' }}>OR</Typography>
            <Box sx={{ flex: 1, borderBottom: '1px solid #e0e0e0' }} />
          </Box>

          <form onSubmit={handleRegisterAuth} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              // Removing the custom colors to use default clean MUI styles
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                bgcolor: '#1976d2',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#1565c0', boxShadow: 'none' }
              }}
            >
              Sign Up
            </Button>
            
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link href="/login" variant="body2" sx={{ fontWeight: 600, textDecoration: 'none' }}>
                    Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}