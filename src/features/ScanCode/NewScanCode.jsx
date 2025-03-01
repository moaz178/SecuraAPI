import React, { useState, useEffect } from "react";
import { LuCodesandbox } from "react-icons/lu";
import { IoIosGitMerge, IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { FaJava, FaPython, FaWindowRestore } from "react-icons/fa";
import { FaRegFileCode } from "react-icons/fa";
import { BiAperture } from "react-icons/bi";
import { SiDotnet, SiPhp, SiNodedotjs, SiRuby } from "react-icons/si";
import { FaCodeBranch } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, useAnimation } from "framer-motion";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners"; // Third-party loader
import { FaEye, FaEyeSlash } from "react-icons/fa";

// ------------------------------------
// 1) Language Configuration
// ------------------------------------
const LANGUAGES = [
  { value: "java", icon: FaJava, label: "Java", color: "#ED8B00" },
  { value: "dotnet", icon: SiDotnet, label: ".NET", color: "#512BD4" },
  { value: "php", icon: SiPhp, label: "PHP", color: "#777BB3" },
  { value: "python", icon: FaPython, label: "Python", color: "#3776AB" },
  { value: "nodejs", icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { value: "ruby", icon: SiRuby, label: "Ruby", color: "#CC342D" }
];

// ------------------------------------
// 2) Stage Icons
// ------------------------------------
const STAGE_ICONS = {
  "Select Language": BiAperture,
  "Verify Source Code": FaCodeBranch,
  "Start Scan": FaRegFileCode
};

// ------------------------------------
// 3) Stage Indicator
// ------------------------------------
const StageIndicator = ({ stages, currentStage, controls }) => {
  return (
    <div style={stageContainerStyle}>
      {stages.map((stage, index) => {
        const IconComponent = STAGE_ICONS[stage];
        return (
          <React.Fragment key={stage}>
            <div
              style={{
                ...stageStyle,
                backgroundColor: currentStage >= index ? "#17A2B8" : "#E5E7EB",
                color: currentStage >= index ? "white" : "#6B7280"
              }}
            >
              <motion.div
                animate={currentStage === 1 && index === 1 ? controls : {}}
                style={{ marginRight: "8px" }}
              >
                <IconComponent size={24} />
              </motion.div>
              <div style={stageTextStyle}>{stage}</div>
            </div>
            {index < stages.length - 1 && (
              <div
                style={{
                  ...stageLineStyle,
                  backgroundColor: currentStage > index ? "#17A2B8" : "#E5E7EB"
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ------------------------------------
// 4) New Redesigned Login Screen
// ------------------------------------
const LoginScreen = ({ onLogin, onClose }) => {
  const [repoURL, setRepoURL] = useState(""); // New state for Repo URL
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { scanDetails } = useScanContext();

  // Track password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      console.log("reference Id:" , scanDetails.referenceId);
      const response = await fetch("http://192.168.18.20:8082/SecuraCore/repoAccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          repoUrl: repoURL,
          username: username,
          password: password
        })
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        onLogin({ repoURL, username, password, branches: data }); // Pass the branches data to the parent component
      } else {
        toast.error("Invalid credentials or API error", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={loginContainerStyle}>
      {/* Foreground form container */}
      <div style={loginCardStyle}>
        {/* Close button in top-right corner */}
        <button style={loginCloseButtonStyle} onClick={onClose}>
          ×
        </button>

        {/* Optional shape overlay */}
        <div style={circleAccentStyle}></div>

        <div style={cardContentWrapperStyle}>
          <div style={loginHeaderStyle}>
            <FaWindowRestore size={32} style={loginHeaderIconStyle} />
            <h2 style={loginHeaderTextStyle}> Repository</h2>
          </div>

          <p style={welcomeTextStyle}>Connect your repository to proceed</p>

          {/* Repo URL Field - Newly Added */}
          <div style={inputFieldStyle}>
            <label style={labelStyle}>Repo URL</label>
            <div style={inputWrapperStyle}>
              <span style={inputIconStyle}>
                {/* Repo URL Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={svgStyle}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m0 0l4-4m-4 4l4 4"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={repoURL}
                onChange={(e) => setRepoURL(e.target.value)}
                placeholder="Enter your repository URL"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Username Field */}
          <div style={inputFieldStyle}>
            <label style={labelStyle}>Username / Email</label>
            <div style={inputWrapperStyle}>
              <span style={inputIconStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={svgStyle}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0
                       018 0zM12 14a7 7 0
                       00-7 7h14a7 7 0
                       00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={inputFieldStyle}>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <span style={inputIconStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={svgStyle}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0
                       002-2v-6a2 2 0
                       00-2-2H6a2 2 0
                       00-2 2v6a2 2 0
                       002 2zm10-10V7a4 4 0
                       00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={inputStyle}
              />
              <span
                style={toggleIconStyle}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <Button
            variant="info"
            style={loginButtonStyle}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px", whiteSpace: "nowrap" }}>
                  Cloning Repo...
                </span>
                <HashLoader color="#fff" size={30} />
              </div>
            ) : (
              "LOG IN"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------
// 5) Branch Selection Screen
// ------------------------------------
const BranchSelectionScreen = ({ branches, onSelectBranch, onClose, isBranchDownloading }) => {
  const [selectedBranch, setSelectedBranch] = useState("");

  const handleBranchSelect = (branch) => {
    // Only update the selection state without calling onSelectBranch
    setSelectedBranch(branch);
  };

  const handleContinue = () => {
    // Only proceed when the Continue button is clicked
    if (selectedBranch) {
      onSelectBranch(selectedBranch);
    }
  };

  return (
    <div style={loginContainerStyle}>
      <div style={loginCardStyle}>
        <button style={loginCloseButtonStyle} onClick={onClose}>×</button>
        <div style={circleAccentStyle}></div>
        <div style={cardContentWrapperStyle}>
          <div style={loginHeaderStyle}>
            <FaCodeBranch size={32} style={{ color: "#17A2B8" }} />
            <h2 style={loginHeaderTextStyle}>Select Branch</h2>
          </div>
          
          <p style={welcomeTextStyle}>Choose a branch to proceed with the scan</p>
          
          <motion.div style={branchGridStyle}>
            {branches.map((branch, index) => (
              <motion.div
                key={index}
                style={{
                  ...branchItemStyle,
                  border: selectedBranch === branch ? '2px solid #17A2B8' : '2px solid transparent',
                  backgroundColor: selectedBranch === branch ? 'rgba(23, 162, 184, 0.1)' : 'transparent'
                }}
                whileHover={{
                  scale: 1.05,
                  border: '2px solid #17A2B8'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBranchSelect(branch)}
              >
                <FaCodeBranch 
                  size={24} 
                  color="#17A2B8"
                  style={{ marginRight: "10px" }}
                />
                <span style={branchTextStyle}>{branch}</span>
              </motion.div>
            ))}
          </motion.div>

          <Button
            variant="info"
            style={{
              ...loginButtonStyle,
              opacity: selectedBranch && !isBranchDownloading ? 1 : 0.6,
              cursor: selectedBranch && !isBranchDownloading ? 'pointer' : 'not-allowed'
            }}
            disabled={!selectedBranch || isBranchDownloading}
            onClick={handleContinue}
          >
            {isBranchDownloading ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px", whiteSpace: "nowrap" }}>Downloading Branch...</span>
                <HashLoader color="#fff" size={20} />
              </div>
            ) : (
              `Continue with ${selectedBranch || 'selected branch'}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------
// 6) Main ScanCode Component
// ------------------------------------
const ScanCode = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loaderWidth, setLoaderWidth] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isVerificationFailed, setIsVerificationFailed] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [dbname, setDbname] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [repoDetails, setRepoDetails] = useState({}); // Store repo details
  const [securaSourcePath, setSecuraSourcePath] = useState(""); // Store secura_sourcePath
  const [isBranchDownloading, setIsBranchDownloading] = useState(false);

  const stages = ["Select Language", "Verify Source Code", "Start Scan"];
  const { scanDetails } = useScanContext();
  const controls = useAnimation();
  const navigate = useNavigate();

  // Animation for stage 1
  useEffect(() => {
    if (isLoading) {
      controls.start({
        opacity: [1, 0.2, 1],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    } else {
      controls.stop();
    }
  }, [isLoading, controls]);

  const handleVerifyClick = async () => {
    if (!selectedLanguage || !securaSourcePath) {
      toast.error("Please select a source code language and download a branch.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
      return;
    }
  
    setIsLoading(true);
    setCurrentStage(1);
    setLoaderWidth(0);
  
    const interval = setInterval(() => {
      setLoaderWidth((prevWidth) => (prevWidth >= 100 ? 0 : prevWidth + 1));
    }, 50);
  
    try {
      const response = await fetch(
        "http://192.168.18.20:8082/SecuraCore/createBuild",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            secura_referenceId: scanDetails.referenceId,
            secura_key: "6m1fcduh0lm3h757ofun4194jn",
            secura_scanningCode: selectedLanguage,
            secura_sourceExtractedPath: securaSourcePath
          })
        }
      );
  
      const data = await response.json();
      setResponseMessage(data.msg || "Verification Failed");
  
      if (data.dbName) {
        console.log(data.dbName);
        setDbname(data.dbName);
        setIsVerified(true);
        setCurrentStage(2);
  
        // Construct the URL with the reference ID
        const progressUrl = `http://192.168.18.20:8081/Portal/CodeProgress?reference_id=${scanDetails.referenceId}`;
  
        // Set the iframe src to the constructed URL
        const iframe = document.getElementById('progressIframe');
        if (iframe) {
          iframe.src = progressUrl;
        }
      } else {
        setIsVerificationFailed(true);
      }
    } catch (error) {
      setResponseMessage("Verification Failed");
      setIsVerificationFailed(true);
    } finally {
      setIsLoading(false);
      clearInterval(interval);
    }
  };
  
  const handleStartscanClick = () => {
    navigate("/startscan",{
      state: {
        selectedLanguage: selectedLanguage,
        securaSourcePath: securaSourcePath,
        dbname: dbname
      }
    });
  };

  const handleLogin = (data) => {
    setRepoDetails(data); // Store repo details
    setBranches(data.branches);
    setIsLoggedIn(true);
  };

  const handleSelectBranch = async (branch) => {
    setIsBranchDownloading(true);
    try {
      const response = await fetch("http://192.168.18.20:8082/SecuraCore/repoSourceDownload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          repoUrl: repoDetails.repoURL,
          username: repoDetails.username,
          password: repoDetails.password,
          branchName: branch
        })
      });

      const result = await response.json();
      console.log("Download Response:", result);

      if (response.ok) {
        setSecuraSourcePath(result.secura_sourcePath); // Store the secura_sourcePath
        toast.success("Branch downloaded successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        });
        setSelectedBranch(branch);
      } else {
        toast.error("Failed to download branch", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    } catch (error) {
      console.error("Error during branch download:", error);
      toast.error("An error occurred during branch download", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    } finally {
      setIsBranchDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={modalOverlayStyle}
    >
      {!isLoggedIn ? (
        // Pass onClose to the LoginScreen so it can close the modal
        <LoginScreen onLogin={handleLogin} onClose={onClose} />
      ) : !selectedBranch ? (
        // Show Branch Selection Screen if branches are available
        <BranchSelectionScreen
          branches={branches}
          onSelectBranch={handleSelectBranch}
          onClose={onClose}
          isBranchDownloading={isBranchDownloading}
        />
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={modalContainerStyle}
        >
          <div style={headerStyle}>
            <div style={headerTitleStyle}>
              <div animate={controls} style={headerIconStyle}>
                <LuCodesandbox size={32} />
              </div>
              Source Code Verification
            </div>
            <button onClick={onClose} style={closeButtonStyle}>
              ✕
            </button>
          </div>

          <div style={stageIndicatorContainerStyle}>
            <StageIndicator
              stages={stages}
              currentStage={currentStage}
              controls={controls}
            />
          </div>

          <div style={contentContainerStyle}>
            {/* Language Selection Stage (Stage 0) */}
            {currentStage === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.div style={languageGridStyle}>
                  {LANGUAGES.map((lang) => (
                    <motion.div
                      key={lang.value}
                      style={{
                        ...languageItemStyle,
                        border:
                          selectedLanguage === lang.value
                            ? `2px solid ${lang.color}`
                            : "2px solid transparent",
                        backgroundColor:
                          selectedLanguage === lang.value
                            ? `${lang.color}10`
                            : "transparent"
                      }}
                      whileHover={{
                        scale: 1.05,
                        border: `2px solid ${lang.color}`
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedLanguage(lang.value);
                      }}
                    >
                      <lang.icon
                        size={32}
                        color={lang.color}
                        style={{ marginRight: "10px" }}
                      />
                      <span style={{ fontSize: "18px", fontWeight: "500" }}>
                        {lang.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <Button
                  variant="info"
                  style={{
                    width: "100%",
                    marginTop: "10px"
                  }}
                  disabled={!selectedLanguage}
                  onClick={handleVerifyClick}
                >
                  Verify Source Code
                </Button>
              </motion.div>
            )}

            {/* Verification Loading Stage (Stage 1) */}
            {currentStage === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={loadingContainerStyle}
              >
                <div style={loadingTextStyle}>
                  Verifying Source Code. Please wait...
                </div>
                <div style={progressBarContainerStyle}>
                  <div
                    style={{
                      ...progressBarStyle,
                      width: `${loaderWidth}%`
                    }}
                  />
                </div>
                <iframe
                  src={`http://192.168.18.20:8081/Portal/CodeProgress?reference_id=${scanDetails.referenceId}`}
                  title="scan progress"
                  width="100%"
                  height="80px"
                  style={{ backgroundColor: "black" }}
                  className="mb-5"
                  id="progressIframe"
                ></iframe>
              </motion.div>
            )}

            {/* Scan Start Stage (Stage 2) */}
            {isVerified && currentStage === 2 && (
              <div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={controls}
                style={resultContainerStyle}
              >
                <IoMdCheckmarkCircle style={successIconStyle} />
                <div style={resultMessageStyle}>{responseMessage}</div>
                <Button
                  onClick={handleStartscanClick}
                  variant="info"
                  style={{
                    width: "100%",
                    marginTop: "10px"
                  }}
                >
                  Start Scan
                </Button>
              </div>
            )}

            {/* Verification Failed State */}
            {isVerificationFailed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={resultContainerStyle}
              >
                <IoMdCloseCircle style={errorIconStyle} />
                <div style={errorMessageStyle}>{responseMessage}</div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
      <ToastContainer />
    </motion.div>
  );
};

export default ScanCode;

// ------------------------------------
// 7) Stage Indicator Styles
// ------------------------------------

const branchGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '15px',
  width: '100%',
  marginBottom: '20px',
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '5px'
};

const branchItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const branchTextStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#1F2937',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const stageContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0",
  width: "100%"
};

const stageStyle = {
  width: "180px",
  height: "50px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease"
};

const stageTextStyle = {
  fontSize: "16px",
  fontWeight: "400",
  textAlign: "center"
};

const stageLineStyle = {
  width: "50px",
  height: "4px",
  margin: "0 10px",
  transition: "background-color 0.3s ease"
};

const stageIndicatorContainerStyle = {
  borderBottom: "1px solid #E5E7EB"
};

// ------------------------------------
// 8) Modal & Shared Container Styles
// ------------------------------------
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 30,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backdropFilter: "blur(5px)",
  fontFamily: "'Inter', sans-serif"
};

const modalContainerStyle = {
  border: "2px solid #17A2B8",
  background: "#fff",
  borderRadius: "12px",
  boxShadow:
    "0 30px 60px -12px rgba(0, 0, 0, 0.3), 0 18px 36px -18px rgba(0, 0, 0, 0.22)",
  width: "60vw",
  maxWidth: "90%",
  overflow: "hidden"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderBottom: "1px solid #E5E7EB"
};

const headerTitleStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "18px",
  fontWeight: "600",
  color: "#1F2937"
};

const headerIconStyle = {
  marginRight: "10px",
  color: "#17A2B8"
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "24px",
  color: "#6B7280",
  cursor: "pointer"
};

const contentContainerStyle = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

// ------------------------------------
// 9) Language Grid & Selection
// ------------------------------------
const languageGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "15px",
  width: "100%",
  marginBottom: "20px"
};

const languageItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontWeight: "600",
  color: "#1F2937"
};

// ------------------------------------
// 10) Verification Progress
// ------------------------------------
const loadingContainerStyle = {
  width: "100%",
  textAlign: "center"
};

const loadingTextStyle = {
  color: "#1F2937",
  marginBottom: "10px",
  fontWeight: "500"
};

const progressBarContainerStyle = {
  width: "100%",
  height: "8px",
  backgroundColor: "#E5E7EB",
  borderRadius: "4px",
  overflow: "hidden"
};

const progressBarStyle = {
  height: "100%",
  background: "linear-gradient(135deg, #17A2B8, #ff6f61)",
  transition: "width 0.3s ease"
};

// ------------------------------------
// 11) Verification Results
// ------------------------------------
const resultContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%"
};

const successIconStyle = {
  color: "#10B981",
  fontSize: "64px",
  marginBottom: "15px"
};

const errorIconStyle = {
  color: "#EF4444",
  fontSize: "64px",
  marginBottom: "15px"
};

const resultMessageStyle = {
  color: "#1F2937",
  fontSize: "18px",
  marginBottom: "20px",
  fontWeight: "500"
};

const errorMessageStyle = {
  color: "#EF4444",
  fontSize: "18px",
  marginBottom: "20px",
  fontWeight: "500"
};

// ------------------------------------
// 12) Redesigned Login Screen Styles
// ------------------------------------
const loginContainerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const loginCardStyle = {
  position: "relative",
  width: "400px",
  maxWidth: "90%",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  zIndex: 1,
  overflow: "hidden",
  padding: "40px 30px"
};

/** Top-right circle overlay (decorative) */
const circleAccentStyle = {
  position: "absolute",
  top: "-60px",
  right: "-60px",
  width: "140px",
  height: "140px",
  background: "linear-gradient(135deg, #17A2B8, #FF7E67)",
  borderRadius: "50%",
  zIndex: 2,
  opacity: 0.6
};

const cardContentWrapperStyle = {
  position: "relative",
  zIndex: 3
};

/** Close button for the login screen modal */
const loginCloseButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "24px",
  color: "#6B7280",
  cursor: "pointer",
  zIndex: 4
};

const loginHeaderStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
  gap: "10px"
};

const loginHeaderIconStyle = {
  color: "#17A2B8"
};

const loginHeaderTextStyle = {
  fontSize: "20px",
  color: "#333",
  fontWeight: 600,
  margin: 0
};

const welcomeTextStyle = {
  margin: "0 0 20px",
  color: "#666",
  fontSize: "15px"
};

const inputFieldStyle = {
  marginBottom: "15px"
};

const labelStyle = {
  fontWeight: 600,
  marginBottom: "5px",
  display: "block",
  fontSize: "14px",
  color: "#444"
};

const inputWrapperStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center"
};

const inputIconStyle = {
  position: "absolute",
  left: "0",
  display: "flex",
  alignItems: "center",
  color: "#888",
  height: "100%",
  width: "24px"
};

const svgStyle = {
  width: "18px",
  height: "18px",
  marginLeft: "4px"
};

const inputStyle = {
  width: "100%",
  padding: "10px 30px 10px 30px",
  border: "none",
  borderBottom: "2px solid #ddd",
  fontSize: "15px",
  outline: "none",
  background: "transparent"
};

/** Eye icon for toggling password visibility */
const toggleIconStyle = {
  position: "absolute",
  right: "10px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: "#888",
  fontSize: "18px"
};

const loginButtonStyle = {
  width: "100%",
  marginTop: "20px",
  backgroundColor: "#17A2B8",
  border: "none",
  fontWeight: 600,
  padding: "14px",
  borderRadius: "25px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  color: "#fff",
  cursor: "pointer",
  whiteSpace: "nowrap",
  minHeight: "50px" // prevents the button height from growing when the loader appears
};
