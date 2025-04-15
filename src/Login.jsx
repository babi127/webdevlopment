import React, { useState } from 'react';
import { User, Lock, LogIn, Mail, Phone, Briefcase, Building2, Hash, FileText, Car, UserPlus, CheckCircle } from 'lucide-react';

// --- Constants ---
const ACCENT_COLOR = '#A8E0C1'; // rgb(168, 224, 193) - Mint Green
const ACCENT_TEXT_COLOR = '#1F2937'; // Dark Gray for contrast on accent bg
const ACCENT_FOCUS_RING = 'focus:ring-[#A8E0C1]'; // Focus ring color

// --- Main App Component (for context) ---
export default function App() {
  return <AuthPage />;
}

// --- Validation Logic ---
const validateField = (name, value, formData) => {
    switch (name) {
        case 'fullName':
            return !value.trim() ? 'Full name is required.' : '';
        case 'signupEmail':
            // Basic email regex (can be improved)
            return !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email address.' : '';
        case 'phone':
            // Basic phone check (e.g., at least 7 digits)
            return !/^\+?[\d\s-]{7,}$/.test(value) ? 'Please enter a valid phone number.' : '';
        case 'signupPassword':
            return value.length < 6 ? 'Password must be at least 6 characters.' : '';
        case 'confirmPassword':
            // Only validate if signupPassword has a value (avoid error when typing signupPassword first)
            return formData.signupPassword && value !== formData.signupPassword ? 'Passwords do not match.' : '';
        case 'role':
             return !value ? 'Please select a role.' : '';
        // Merchant Fields
        case 'businessName':
            return !value.trim() ? 'Business name is required.' : '';
        case 'businessAddress':
            return !value.trim() ? 'Business address is required.' : '';
        case 'registrationId':
            return !value.trim() ? 'Business registration ID is required.' : '';
        // DSP Fields
        case 'vehicleType':
            return !value.trim() ? 'Vehicle type is required.' : '';
        case 'plateNumber':
            return !value.trim() ? 'Plate number is required.' : '';
        // Add file validation if needed (e.g., check formData.permitFile)
        // case 'permitFile': return !value ? 'Business permit is required.' : '';
        // case 'licenseFile': return !value ? 'Driver\'s license is required.' : '';
        default:
            return '';
    }
};


// --- Authentication Page Component ---
function AuthPage() {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({});
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Use an object to store errors for each field
  const [errors, setErrors] = useState({});
  // Track which fields have been touched (blurred)
  const [touched, setTouched] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFormData = { ...formData };
    let currentSelectedRole = selectedRole;

    if (name === 'role') {
      console.log("Role selected:", value);
      // eslint-disable-next-line no-unused-vars
      currentSelectedRole = value; // Update role immediately for validation context
      setSelectedRole(value);
      newFormData[name] = value;
      // Clear data specific to other roles if role changes
      if (value === 'Customer') {
          delete newFormData.businessName; delete newFormData.businessAddress; delete newFormData.registrationId; delete newFormData.permitFile;
          delete newFormData.vehicleType; delete newFormData.plateNumber; delete newFormData.licenseFile;
      } else if (value === 'Merchant') {
          delete newFormData.vehicleType; delete newFormData.plateNumber; delete newFormData.licenseFile;
      } else if (value === 'DSP') {
           delete newFormData.businessName; delete newFormData.businessAddress; delete newFormData.registrationId; delete newFormData.permitFile;
      }
       // Clear role error when a role is selected
       setErrors(prevErrors => ({ ...prevErrors, role: '' }));
       setTouched(prevTouched => ({ ...prevTouched, role: true })); // Mark role as touched once selected

    } else if (type === 'checkbox') {
      newFormData[name] = checked;
    } else {
      newFormData[name] = value;
    }

    setFormData(newFormData);
    setSuccessMessage('');

    // Re-validate field on change only if it was already touched
    if (touched[name]) {
        const fieldError = validateField(name, value, newFormData); // Pass potentially updated formData
        setErrors(prevErrors => ({ ...prevErrors, [name]: fieldError }));
        // Special case: Re-validate confirmPassword if signupPassword changes
        if (name === 'signupPassword' && touched.confirmPassword) {
             const confirmPasswordError = validateField('confirmPassword', newFormData.confirmPassword || '', newFormData);
             setErrors(prevErrors => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
        }
    }
  };

   // Handle blur event to mark field as touched and validate it
   const handleBlur = (e) => {
        const { name, value } = e.target;
        // Don't mark radio buttons as touched on blur, only on change/submit
        if (e.target.type !== 'radio') {
            setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
        }
        const fieldError = validateField(name, value, formData);
        setErrors(prevErrors => ({ ...prevErrors, [name]: fieldError }));

        // Special case: Validate confirmPassword when signupPassword blurs
        if (name === 'signupPassword' && formData.confirmPassword) {
            const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword, formData);
            // Only update confirmPassword error if it was already touched or has an error
             if (touched.confirmPassword || errors.confirmPassword) {
                setErrors(prevErrors => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
             }
        }
   };


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      console.log(`File selected for ${name}:`, files[0].name);
      // Optionally add file validation here or on submit
       setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Clear any previous file error
       setTouched(prevTouched => ({ ...prevTouched, [name]: true })); // Mark as touched
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setSuccessMessage('');
    setIsLoading(true);
    console.log('Login attempt:', { email: formData.loginEmail, password: formData.loginPassword });
    // Basic validation
    let loginErrors = {};
    if (!formData.loginEmail || !validateField('signupEmail', formData.loginEmail, {})) loginErrors.loginEmail = 'Valid email is required.'; // Use signupEmail validation
    if (!formData.loginPassword) loginErrors.loginPassword = 'Password is required.';

    if (Object.keys(loginErrors).length > 0) {
        setErrors(loginErrors);
        setTouched({ loginEmail: true, loginPassword: true }); // Mark fields as touched to show errors
        setIsLoading(false);
        return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Login attempt for ${formData.loginEmail} (Placeholder)`);
    }, 1500);
  };

  // Single Signup Submit Handler
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // --- Validate ALL fields ---
    const fieldsToValidate = [
        'fullName', 'signupEmail', 'phone', 'signupPassword', 'confirmPassword', 'role'
    ];
    // Use selectedRole state which is updated on change
    if (selectedRole === 'Merchant') {
        fieldsToValidate.push('businessName', 'businessAddress', 'registrationId');
        // fieldsToValidate.push('permitFile'); // Add if file upload is mandatory
    } else if (selectedRole === 'DSP') {
        fieldsToValidate.push('vehicleType', 'plateNumber');
        // fieldsToValidate.push('licenseFile'); // Add if file upload is mandatory
    }

    let formIsValid = true;
    let currentErrors = {};
    let currentTouched = {};

    fieldsToValidate.forEach(fieldName => {
        const value = formData[fieldName] || ''; // Use empty string if undefined
        const error = validateField(fieldName, value, formData);
        if (error) {
            formIsValid = false;
            currentErrors[fieldName] = error;
        }
        currentTouched[fieldName] = true; // Mark all fields as touched on submit
    });

    setErrors(currentErrors);
    setTouched(currentTouched); // Update touched state to show all errors

    if (!formIsValid) {
        console.log("Signup Validation Failed:", currentErrors);
        return; // Stop submission if validation fails
    }
    // --- End Validation ---


    setIsLoading(true);
    console.log('Submitting Full Signup Data:', formData, 'Role:', selectedRole);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setAuthMode('completed');
      if (selectedRole === 'Customer') { setSuccessMessage('Registration successful! You can now log in.'); }
      else if (selectedRole === 'Merchant') { setSuccessMessage('Merchant registration submitted! Your account may require verification before login.'); }
      else if (selectedRole === 'DSP') { setSuccessMessage('DSP registration submitted! Your account requires admin approval before login.'); }
      setFormData({});
      setSelectedRole('');
      setTouched({}); // Reset touched state
      setErrors({}); // Reset errors
    }, 1500);
  };


  const switchMode = (mode) => {
    setAuthMode(mode);
    setFormData({});
    setSelectedRole('');
    setErrors({});
    setTouched({});
    setSuccessMessage('');
  };

  // --- Rendering Logic ---
  const renderContent = () => {
    if (authMode === 'login') {
      return renderLoginForm();
    } else if (authMode === 'signup') {
      return renderSignupForm();
    } else if (authMode === 'completed') {
        return renderCompletionMessage();
    }
    return null;
  };

  // --- Form Render Functions ---

  const renderLoginForm = () => (
    <form onSubmit={handleLoginSubmit} className="space-y-6 animate-fade-in">
      <InputGroup icon={Mail} name="loginEmail" type="email" placeholder="Email Address" value={formData.loginEmail || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.loginEmail && errors.loginEmail} required />
      <InputGroup icon={Lock} name="loginPassword" type="password" placeholder="Password" value={formData.loginPassword || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.loginPassword && errors.loginPassword} required />
      {/* Display general login errors if needed, separate from field errors */}
      {/* {typeof errors === 'string' && errors && <p className="text-sm text-red-400 text-center">{errors}</p>} */}
      <div className="text-right text-sm">
        <a href="#" className="font-medium text-gray-400 hover:text-[#A8E0C1] transition-colors duration-300">
          Forgot Password?
        </a>
      </div>
      <SubmitButton isLoading={isLoading} text="Login" icon={LogIn} />
    </form>
  );

  // Combined Signup Form
  const renderSignupForm = () => (
    <form onSubmit={handleSignupSubmit} className="space-y-5 animate-fade-in">
      {/* Basic Info Fields */}
      <InputGroup icon={User} name="fullName" type="text" placeholder="Full Name" value={formData.fullName || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.fullName && errors.fullName} required />
      <InputGroup icon={Mail} name="signupEmail" type="email" placeholder="Email Address" value={formData.signupEmail || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.signupEmail && errors.signupEmail} required />
      <InputGroup icon={Phone} name="phone" type="tel" placeholder="Phone Number" value={formData.phone || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.phone && errors.phone} required />
      <InputGroup icon={Lock} name="signupPassword" type="password" placeholder="Password" value={formData.signupPassword || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.signupPassword && errors.signupPassword} required />
      <InputGroup icon={Lock} name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.confirmPassword && errors.confirmPassword} required />

      {/* Role Selection */}
      <div className="space-y-2 pt-2">
        <label className="block text-sm font-medium text-gray-300 mb-1">Register As:</label>
        <div className="grid grid-cols-3 gap-3">
          {['Customer', 'Merchant', 'DSP'].map(role => (
            <RadioCard
              key={role}
              name="role"
              value={role}
              label={role}
              checked={selectedRole === role}
              onChange={handleInputChange}
              // No onBlur needed for radio group usually, validation happens on submit or change
            />
          ))}
        </div>
         {touched.role && errors.role && <p className="text-xs text-red-400 mt-1">{errors.role}</p>} {/* Show role error */}
      </div>

      {/* Conditional Fields Container with Animation */}
      <div className="conditional-fields-container space-y-5">
            {/* Merchant Fields (Conditionally Rendered) */}
            {selectedRole === 'Merchant' && (
                <div className="pt-3 border-t border-white/10 animate-slide-down space-y-5">
                    <h3 className="text-md font-semibold text-[#A8E0C1] text-center">Merchant Details</h3>
                    <InputGroup icon={Briefcase} name="businessName" type="text" placeholder="Business Name" value={formData.businessName || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.businessName && errors.businessName} required />
                    <InputGroup icon={Building2} name="businessAddress" type="text" placeholder="Business Address" value={formData.businessAddress || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.businessAddress && errors.businessAddress} required />
                    <InputGroup icon={Hash} name="registrationId" type="text" placeholder="Business Registration ID" value={formData.registrationId || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.registrationId && errors.registrationId} required />
                    <FileInputGroup name="permitFile" label="Upload Business Permit" onChange={handleFileChange} onBlur={handleBlur} error={touched.permitFile && errors.permitFile} fileName={formData.permitFile?.name} />
                </div>
            )}

            {/* DSP Fields (Conditionally Rendered) */}
            {selectedRole === 'DSP' && (
                <div className="pt-3 border-t border-white/10 animate-slide-down space-y-5">
                     <h3 className="text-md font-semibold text-[#A8E0C1] text-center">Delivery Provider Details</h3>
                    <InputGroup icon={Car} name="vehicleType" type="text" placeholder="Vehicle Type (e.g., Motorcycle, Van)" value={formData.vehicleType || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.vehicleType && errors.vehicleType} required />
                    <InputGroup icon={Hash} name="plateNumber" type="text" placeholder="Vehicle Plate Number" value={formData.plateNumber || ''} onChange={handleInputChange} onBlur={handleBlur} error={touched.plateNumber && errors.plateNumber} required />
                    <FileInputGroup name="licenseFile" label="Upload Driver's License" onChange={handleFileChange} onBlur={handleBlur} error={touched.licenseFile && errors.licenseFile} fileName={formData.licenseFile?.name} />
                </div>
            )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <SubmitButton isLoading={isLoading} text="Create Account" icon={UserPlus} />
      </div>
    </form>
  );


   const renderCompletionMessage = () => (
        <div className="text-center space-y-4 animate-fade-in p-8 min-h-[300px] flex flex-col justify-center items-center">
            <CheckCircle className="w-16 h-16 text-[#A8E0C1] mx-auto animate-pulse"/>
            <h3 className="text-2xl font-bold text-white">Registration Submitted!</h3>
            <p className="text-gray-300">{successMessage}</p>
            <button
                onClick={() => switchMode('login')}
                className={`mt-6 inline-flex items-center justify-center px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out bg-[#A8E0C1] text-[${ACCENT_TEXT_COLOR}] hover:bg-opacity-80 focus:outline-none ${ACCENT_FOCUS_RING} focus:ring-offset-2 focus:ring-offset-gray-900`}
            >
                Back to Login
            </button>
        </div>
    );


  // --- Main Return ---
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4 overflow-hidden relative font-sans">
      {/* Animated Background Elements (Subtle) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#A8E0C1]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse-slow animation-delay-3000"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-800/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-10">
           {/* Conditional Header Rendering */}
           {authMode !== 'completed' && (
             <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center bg-[#A8E0C1]/10 p-3 rounded-full mb-4 border border-[#A8E0C1]/20`}>
                    <UserPlus className={`h-8 w-8 text-[${ACCENT_COLOR}]`} />
                </div>
                <h1 className="text-3xl font-bold text-white mb-1">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-sm text-gray-400">
                    {authMode === 'login' ? 'Login to access the MDS Platform.' : 'Join the MDS Platform today.'}
                </p>
             </div>
           )}
          {/* Dynamic Content Area */}
          <div className="transition-all duration-500 ease-in-out">
             {renderContent()}
          </div>
          {/* Switch Mode Link */}
          { authMode !== 'completed' && (
            <p className="mt-8 text-center text-sm text-gray-400">
                {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                onClick={() => switchMode(authMode === 'login' ? 'signup' : 'login')}
                className={`font-medium text-[${ACCENT_COLOR}] hover:text-opacity-80 transition-colors duration-300 bg-transparent border-none p-0 cursor-pointer`}
                >
                {authMode === 'login' ? 'Sign Up' : 'Login'}
                </button>
            </p>
          )}
        </div>
      </div>

       {/* CSS for Animations & Styling (Keep the CSS from the previous version) */}
       <style jsx global>{`
        @keyframes pulse-slow { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.03); } }
        .animate-pulse-slow { animation: pulse-slow 10s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animation-delay-3000 { animation-delay: 3s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-15px); max-height: 0; } to { opacity: 1; transform: translateY(0); max-height: 1000px; /* Large enough height */ } }
        .animate-slide-down { animation: slideDown 0.5s ease-out forwards; overflow: hidden; /* Needed for max-height animation */ }
        .conditional-fields-container > div { animation: slideDown 0.5s ease-out forwards; overflow: hidden; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; } /* Used on completion checkmark */
        .radio-card:checked + label { border-color: ${ACCENT_COLOR}; background-color: rgba(168, 224, 193, 0.1); color: ${ACCENT_COLOR}; }
        .radio-card:focus + label { outline: 2px solid transparent; outline-offset: 2px; box-shadow: 0 0 0 2px #1F2937, 0 0 0 4px rgba(168, 224, 193, 0.4); }
        input[type="radio"].radio-card:checked + label { border-color: ${ACCENT_COLOR}; background-color: rgba(168, 224, 193, 0.1); color: ${ACCENT_COLOR}; }
        .file-input-label { background-color: rgba(168, 224, 193, 0.1); color: ${ACCENT_COLOR}; border: 1px dashed rgba(168, 224, 193, 0.3); transition: background-color 0.2s ease, border-color 0.2s ease; }
        .file-input-label:hover { background-color: rgba(168, 224, 193, 0.2); border-color: rgba(168, 224, 193, 0.5); }
        .input-group input:focus ~ label, .input-group input:not(:placeholder-shown) ~ label { transform: translateY(-1.6rem) translateX(-0.25rem) scale(0.8); color: ${ACCENT_COLOR}; background-color: #1f2937; padding-left: 0.25rem; padding-right: 0.25rem; border-radius: 0.125rem; }
        .input-group input:not(:placeholder-shown):not(:focus) ~ label { background-color: #1f2937; }
        .peer:placeholder-shown ~ label { top: 50%; transform: translateY(-50%); font-size: 1rem; }
        .peer:focus ~ label, .peer:not(:placeholder-shown) ~ label { top: 0; transform: translateY(-50%) scale(0.8); font-size: 0.75rem; color: ${ACCENT_COLOR}; background-color: #1f2937; padding-left: 0.25rem; padding-right: 0.25rem; border-radius: 0.125rem; }
        .error-text { color: #F87171; font-size: 0.75rem; margin-top: 0.25rem; }
        .error-border { border-color: #F87171 !important; }
        .error-border:focus { border-color: #F87171 !important; box-shadow: 0 0 0 1px #F87171; }
      `}</style>
    </div>
  );
}


// --- Reusable Form Components ---

// Input Group with Icon, Floating Label, and Error Display
function InputGroup({ icon: Icon, name, type, placeholder, value, onChange, onBlur, error = null, required = false }) {
  const id = `input-${name}`;
  const hasError = Boolean(error);
  return (
    <div className="relative input-group">
      <span className="absolute left-3 top-3.5 z-10 pointer-events-none">
        <Icon className={`w-5 h-5 transition-colors duration-300 ${hasError ? 'text-red-400' : 'text-gray-400 peer-focus:text-[#A8E0C1] peer-[:not(:placeholder-shown)]:text-[#A8E0C1]'}`} />
      </span>
      <input
        type={type}
        id={id}
        name={name}
        placeholder=" " // Required for :placeholder-shown selector
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Added onBlur prop
        required={required}
        className={`peer w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-transparent focus:outline-none focus:border-transparent focus:bg-gray-700/80 transition-all duration-300 ${
            hasError
            ? `border-red-400 focus:ring-1 focus:ring-red-400 error-border` // Error state
            : `border-gray-600/50 focus:ring-1 focus:ring-[#A8E0C1]` // Normal state
        }`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
         className={`absolute left-10 top-0 -translate-y-1/2 text-base px-0 pointer-events-none transition-all duration-300 origin-top-left
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base
                   peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:text-xs peer-focus:bg-[#1f2937] peer-focus:px-1 peer-focus:rounded-sm
                   peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-[0.8] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#1f2937] peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:rounded-sm
                   ${hasError ? 'text-red-400' : 'text-gray-400 peer-focus:text-[#A8E0C1]'}` // Label color changes on error
        }
      >
        {placeholder}
      </label>
      {/* Error Message Display */}
      {hasError && <p id={`${id}-error`} className="error-text">{error}</p>}
    </div>
  );
}

// Submit Button with Loading State
function SubmitButton({ isLoading, text, icon: Icon }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full flex justify-center items-center px-4 py-3 text-base font-semibold rounded-lg border border-transparent transition-all duration-300 ease-in-out group disabled:opacity-60 disabled:cursor-not-allowed bg-[${ACCENT_COLOR}] text-[${ACCENT_TEXT_COLOR}] hover:bg-opacity-80 focus:outline-none ${ACCENT_FOCUS_RING} focus:ring-offset-2 focus:ring-offset-gray-900`}
    >
      {isLoading ? (
        <>
          <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-[${ACCENT_TEXT_COLOR}]`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5 mr-2 -ml-1" />}
          {text}
        </>
      )}
    </button>
  );
}

// Custom Radio Button Card
function RadioCard({ name, value, label, checked, onChange }) {
    const id = `radio-${name}-${value}`;
    return (
        <div>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                required // Make role selection required
                className="hidden radio-card" // Hide default radio
            />
            <label
                htmlFor={id}
                className="block p-3 border border-gray-600/50 rounded-lg cursor-pointer text-center text-sm font-medium text-gray-300 hover:border-gray-500 transition-colors duration-200"
            >
                {label}
            </label>
        </div>
    );
}

// File Input Group (Added error prop)
function FileInputGroup({ name, label, onChange, onBlur, error = null, fileName }) {
    const id = `file-${name}`;
    const hasError = Boolean(error);
    return (
         <div>
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-300">{label}</label>
            <label htmlFor={id} className={`file-input-label flex items-center justify-center w-full px-4 py-3 rounded-lg cursor-pointer ${hasError ? 'border-red-400 !border-dashed' : 'border-gray-600/50'}`}> {/* Error state styling */}
                <FileText className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium truncate max-w-[calc(100%-2rem)]">
                    {fileName ? fileName : `Choose ${label.split(' ').pop().toLowerCase()} file...`}
                </span>
            </label>
            <input
                type="file"
                id={id}
                name={name}
                onChange={onChange}
                onBlur={onBlur} // Added onBlur
                className="hidden"
                aria-invalid={hasError}
                aria-describedby={hasError ? `${id}-error` : undefined}
            />
            {/* Error Message Display */}
            {hasError && <p id={`${id}-error`} className="error-text">{error}</p>}
        </div>
    );
}
