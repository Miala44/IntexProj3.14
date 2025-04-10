import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    age: '',
    gender: '',
    netflix: 0,
    amazonPrime: 0,
    disneyPlus: 0,
    paramountPlus: 0,
    max: 0,
    hulu: 0,
    appleTV: 0,
    peacock: 0,
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState('');
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: checkbox.checked ? 1 : 0,
      }));
    } else if (type === 'number') {
      setForm((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      email,
      password,
      confirmPassword,
      name,
      phone,
      age,
      gender,
      city,
      state,
      zip,
    } = form;
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !phone ||
      !age ||
      !gender ||
      !city ||
      !state ||
      !zip
    ) {
      setError('Please fill in all required fields.');
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 10 characters, include one uppercase letter, one number, and one special character.'
      );
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Phone must be a 10-digit number (e.g., 8013492323).');
      return;
    }
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
      setError('ZIP code must be exactly 5 digits.');
      return;
    }
    try {
      const response = await fetch(
        'https://intexbackend-a6fvcvg6cha4hwcx.eastus-01.azurewebsites.net/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Registration failed.');
      }
      setError('');
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-4">Register</h5>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <input
                className="form-control mb-2"
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <input
                className="form-control mb-2"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <input
                className="form-control mb-2"
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className="form-control mb-2"
                placeholder="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                className="form-control mb-2"
                placeholder="Age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
              />
              <select
                className="form-control mb-2"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                className="form-control mb-2"
                placeholder="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
              <select
                className="form-control mb-2"
                name="state"
                value={form.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {[
                  'AL',
                  'AK',
                  'AZ',
                  'AR',
                  'CA',
                  'CO',
                  'CT',
                  'DE',
                  'FL',
                  'GA',
                  'HI',
                  'ID',
                  'IL',
                  'IN',
                  'IA',
                  'KS',
                  'KY',
                  'LA',
                  'ME',
                  'MD',
                  'MA',
                  'MI',
                  'MN',
                  'MS',
                  'MO',
                  'MT',
                  'NE',
                  'NV',
                  'NH',
                  'NJ',
                  'NM',
                  'NY',
                  'NC',
                  'ND',
                  'OH',
                  'OK',
                  'OR',
                  'PA',
                  'RI',
                  'SC',
                  'SD',
                  'TN',
                  'TX',
                  'UT',
                  'VT',
                  'VA',
                  'WA',
                  'WV',
                  'WI',
                  'WY',
                ].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <input
                className="form-control mb-2"
                placeholder="ZIP"
                name="zip"
                type="number"
                value={form.zip}
                onChange={handleChange}
              />
              <div className="mb-3">
                {[
                  'netflix',
                  'amazonPrime',
                  'disneyPlus',
                  'paramountPlus',
                  'max',
                  'hulu',
                  'appleTV',
                  'peacock',
                ].map((service) => (
                  <div
                    className="d-flex justify-content-between align-items-center mb-2"
                    key={service}
                  >
                    <label
                      htmlFor={service}
                      className="form-check-label text-capitalize"
                    >
                      {service.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      className="form-check-input ms-2"
                      type="checkbox"
                      name={service}
                      id={service}
                      checked={(form as any)[service] === 1}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-secondary text-uppercase"
                  type="button"
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </button>
              </div>
              {error && <p className="text-danger fw-bold mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
