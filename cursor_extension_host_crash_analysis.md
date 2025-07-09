# Cursor Extension Host Crash Analysis - Code 5

## Overview

You're experiencing a Cursor extension host crash with exit code 5. This is a common issue affecting VSCode-based editors like Cursor, where the extension host process terminates unexpectedly, affecting the functionality of extensions.

## Error Details

```
[main 2025-07-09T08:47:17.932Z] [UtilityProcess id: 1, type: extensionHost, pid: 89571]: crashed with code 5 and reason 'crashed'
Extension host (LocalProcess pid: 89571) terminated unexpectedly. Code: 5, Signal: unknown
```

**Extensions running at crash time:**
- vscode.emmet
- vscode.configuration-editing
- vscode.extension-editing
- vscode.json-language-features
- vscode.npm
- vscode.git-base
- vscode.git
- vscode.github
- anysphere.cursor-* extensions (multiple)
- vscode.debug-auto-launch
- vscode.merge-conflict
- vscode.github-authentication

## Common Causes

### 1. **Antivirus Software Interference**
- **Most Common Cause**: Corporate antivirus software blocking or interfering with Cursor processes
- Many users report this issue is resolved by adding Cursor to antivirus exceptions
- Particularly common in enterprise environments

### 2. **Memory/Resource Constraints**
- Extension host running out of memory
- System resource limitations
- Large workspace with many files causing file watcher issues

### 3. **Problematic Extensions**
- Conflicting or corrupted extensions
- Extension compatibility issues
- Specific extensions causing crashes (e.g., Remote-SSH, language servers)

### 4. **Process Management Issues**
- Linux-specific issues with process spawning
- GPU process conflicts
- File watcher limitations

### 5. **System Environment Issues**
- Outdated system libraries
- Missing dependencies
- Graphics driver issues

## Solutions & Troubleshooting Steps

### Immediate Steps

#### 1. **Extension Bisect**
```bash
# Start Cursor with extension bisect to identify problematic extensions
cursor --start-extension-bisect
```

#### 2. **Disable Extensions Temporarily**
```bash
# Start Cursor without extensions
cursor --disable-extensions
```

#### 3. **Check Antivirus Settings**
- Add Cursor installation directory to antivirus exceptions
- Add `~/.cursor` directory to exceptions
- Temporarily disable real-time scanning to test

### System-Level Solutions

#### 1. **Linux: Increase File Watcher Limits**
```bash
# Check current limit
cat /proc/sys/fs/inotify/max_user_watches

# Increase limit (add to /etc/sysctl.conf)
fs.inotify.max_user_watches=524288

# Apply changes
sudo sysctl -p
```

#### 2. **Clear Cursor Cache and Data**
```bash
# Remove Cursor cache
rm -rf ~/.cursor
rm -rf ~/.cursor-server

# For Linux users
rm -rf ~/.config/Cursor
```

#### 3. **Launch with Debugging Flags**
```bash
# Disable GPU acceleration
cursor --disable-gpu

# Disable sandbox
cursor --no-sandbox

# Verbose logging
cursor --log debug
```

### Advanced Troubleshooting

#### 1. **Check System Resources**
```bash
# Monitor memory usage
top -p $(pgrep cursor)

# Check disk space
df -h

# Monitor file handles
lsof | grep cursor
```

#### 2. **Update Dependencies (Linux)**
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade
sudo apt install gvfs libglib2.0-bin

# Fedora/CentOS
sudo dnf update
sudo dnf install gvfs
```

#### 3. **Graphics Issues (Linux)**
```bash
# Update graphics drivers
sudo apt install nvidia-driver-xxx  # For NVIDIA
sudo apt install mesa-utils         # For Intel/AMD

# Force software rendering
cursor --disable-gpu --disable-software-rasterizer
```

### Specific Fix for Remote Development

If using Remote-SSH or similar:
```bash
# Delete remote server cache
rm -rf ~/.cursor-server

# Restart with clean remote connection
cursor --remote ssh-remote+hostname
```

## Environment-Specific Solutions

### **Corporate/Enterprise Environment**
1. Contact IT to whitelist Cursor processes
2. Request antivirus exceptions for:
   - Cursor installation directory
   - `~/.cursor` directory
   - Extension directories
3. Check firewall restrictions

### **Linux Users**
1. Use AppImage with `--no-sandbox` flag
2. Install via package manager for better integration
3. Check desktop environment compatibility

### **Windows Users**
1. Run as administrator temporarily to test
2. Check Windows Defender exclusions
3. Disable hardware acceleration in Cursor settings

## Prevention Strategies

### 1. **Workspace Configuration**
Add to `.vscode/settings.json`:
```json
{
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/**": true,
    "**/.venv/**": true,
    "**/venv/**": true,
    "**/__pycache__/**": true
  }
}
```

### 2. **Extension Management**
- Keep extensions updated
- Remove unused extensions
- Use workspace-specific extension recommendations

### 3. **System Maintenance**
- Regular system updates
- Monitor disk space
- Keep adequate free memory

## Recovery Steps

If Cursor won't start at all:

1. **Safe Mode Start**
   ```bash
   cursor --safe-mode
   ```

2. **Reset Settings**
   ```bash
   cursor --user-data-dir /tmp/cursor-temp
   ```

3. **Reinstall Cursor**
   - Completely uninstall
   - Remove all configuration directories
   - Fresh installation

## When to Seek Further Help

Contact Cursor support if:
- Issue persists after trying all solutions
- Crash happens immediately on startup
- System-wide impact on other Electron apps
- Corporate environment with strict security policies

## Additional Resources

- [Cursor Community Forum](https://forum.cursor.com/)
- [VSCode Linux Troubleshooting](https://code.visualstudio.com/docs/setup/linux)
- [Extension Host Process Documentation](https://code.visualstudio.com/api/advanced-topics/extension-host)

## Conclusion

Extension host crashes with code 5 are typically resolved by:
1. **Adding antivirus exceptions** (most common fix)
2. **Increasing system limits** (Linux users)
3. **Identifying problematic extensions** (extension bisect)
4. **Clearing cache and reinstalling** (last resort)

The issue is usually environmental rather than a bug in Cursor itself, making it solvable with the appropriate system configuration changes.